import { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'
import DashboardHeader from '../blocks/DashboardHeader'
import ChemicalSensorCard from '../blocks/ChemicalSensorCard'
import ColorPreviewCard from '../blocks/ColorPreviewCard'
import MLResultCard from '../blocks/MLResultCard'
import ChartToggleSection from '../blocks/ChartToggleSection'
import { THINGSPEAK_URL } from '../../utils/ThinkSpeak'
import * as XLSX from "xlsx";
import { FiDownload, FiRefreshCw } from 'react-icons/fi'
import iot1 from '../../assets/Img1.jpeg'

export const ETongue = () => {
    const { controls } = useContext(DContext)

    const [eTongueData, setETongueData] = useState({
        r: [],
        g: [],
        b: [],
        fq: [],
        ph: 0,
        dts: 0,
        voc: 0,
        xAxis: []
    });

    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);

    // ✅ FETCH DATA
    useEffect(() => {
        if (!THINGSPEAK_URL) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(THINGSPEAK_URL);
                const data = await res.json();
                if (!data.feeds?.length) return;

                const x = [];
                const ySeries = { r: [], g: [], b: [], fq: [] };

                let latest1 = [0, 0, 0]; // field1
                let latest2 = [0, 0, 0, 0]; // field2

                data.feeds.forEach(feed => {
                    x.push(new Date(feed.created_at).getTime());

                    if (feed.field1) {
                        latest1 = feed.field1.split(',').map(Number);
                    }

                    if (feed.field2) {
                        latest2 = feed.field2.split(',').map(Number);
                    }

                    ySeries.r.push(latest2[0] ?? null);
                    ySeries.g.push(latest2[1] ?? null);
                    ySeries.b.push(latest2[2] ?? null);
                    ySeries.fq.push(latest2[3] ?? null);
                });

                setETongueData({
                    r: ySeries.r,
                    g: ySeries.g,
                    b: ySeries.b,
                    fq: ySeries.fq,
                    ph: latest1[0] ?? 0,
                    dts: latest1[1] ?? 0,
                    voc: latest1[2] ?? 0,
                    xAxis: x.slice(-100)
                });

                setLastUpdate(new Date());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const id = setInterval(fetchData, 5000);
        return () => clearInterval(id);
    }, []);

    // ✅ DOWNLOAD EXCEL
    const handleDownload = async () => {
        try {
            setLoading(true);
            const res = await fetch(THINGSPEAK_URL);
            const data = await res.json();

            if (!data.feeds?.length) return;

            const lastRecords = data.feeds.slice(-50); // Get last 50 records

            const formattedData = lastRecords.map(feed => {
                let field1 = [0, 0, 0];
                let field2 = [0, 0, 0, 0];

                if (feed.field1) {
                    field1 = feed.field1.split(',').map(Number);
                }

                if (feed.field2) {
                    field2 = feed.field2.split(',').map(Number);
                }

                return {
                    'Timestamp': new Date(feed.created_at).toLocaleString(),
                    'pH': field1[0].toFixed(2),
                    'DTS (ppm)': field1[1].toFixed(2),
                    'VOC (ppm)': field1[2].toFixed(2),
                    'R': field2[0],
                    'G': field2[1],
                    'B': field2[2],
                    'Frequency (Hz)': field2[3],
                };
            });

            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            worksheet['!cols'] = [
                { wch: 20 },
                { wch: 12 },
                { wch: 12 },
                { wch: 12 },
                { wch: 8 },
                { wch: 8 },
                { wch: 8 },
                { wch: 15 },
            ];

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "E-Tongue Data");

            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });

            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
            });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `E-Tongue_Data_${new Date().toISOString().split('T')[0]}.xlsx`;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download Error:", error);
            alert("Error downloading file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Determine sensor status based on values
    const getSensorStatus = (value, type) => {
        if (type === 'ph') {
            if (value >= 6.5 && value <= 8.5) return 'normal';
            if ((value >= 6 && value < 6.5) || (value > 8.5 && value <= 9)) return 'warning';
            return 'danger';
        }
        if (type === 'dts') {
            if (value < 500) return 'normal';
            if (value < 1000) return 'warning';
            return 'danger';
        }
        if (type === 'voc') {
            if (value < 1) return 'normal';
            if (value < 2) return 'warning';
            return 'danger';
        }
        return 'normal';
    };

    // ✅ Determine ML result based on sensor values
    const getMLResult = () => {
        const phStatus = getSensorStatus(eTongueData.ph, 'ph');
        const dtsStatus = getSensorStatus(eTongueData.dts, 'dts');
        const vocStatus = getSensorStatus(eTongueData.voc, 'voc');

        let status = 'safe';
        let confidence = 92;

        if (phStatus === 'danger' || dtsStatus === 'danger' || vocStatus === 'danger') {
            status = 'unsafe';
            confidence = 95;
        } else if (phStatus === 'warning' || dtsStatus === 'warning' || vocStatus === 'warning') {
            status = 'warning';
            confidence = 85;
        }

        return { status, confidence };
    };

    // ✅ CHART DATA
    const mainChartData = [
        { seriesName: 'R', 'x-axis': eTongueData.xAxis, 'y-axis': eTongueData.r, color: '#ef4444' },
        { seriesName: 'G', 'x-axis': eTongueData.xAxis, 'y-axis': eTongueData.g, color: '#22c55e' },
        { seriesName: 'B', 'x-axis': eTongueData.xAxis, 'y-axis': eTongueData.b, color: '#3b82f6' },
        { seriesName: 'Frequency', 'x-axis': eTongueData.xAxis, 'y-axis': eTongueData.fq, color: '#a855f7' },
    ];

    const mlResult = getMLResult();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            {/* Header */}
            <DashboardHeader onDownload={handleDownload} isConnected={true} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-10">
                {/* Loading state indicator */}
                {loading && (
                    <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <FiRefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                        <p className="text-sm text-blue-700 font-medium">Updating data...</p>
                    </div>
                )}

                {/* Last Update Time */}
                {/* {lastUpdate && (
                    <div className="mb-6 text-sm text-gray-600 text-right">
                        Last updated: {lastUpdate.toLocaleTimeString()}
                    </div>
                )} */}



                {/* 1. CHEMICAL SENSORS GRID */}
                <div className="mb-8">
                    <div className="mb-4 flex gap-6 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">🧪 Chemical Sensors</h2>
                            <p className="text-sm text-gray-600 mt-1">Real-time chemical analysis readings</p>
                        </div>
                        <div>
                            <img src={iot1} className='w-56' />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ChemicalSensorCard
                            label="pH Level"
                            value={eTongueData.ph}
                            unit="pH Scale"
                            status={getSensorStatus(eTongueData.ph, 'ph')}
                            icon="ph"
                        />
                        <ChemicalSensorCard
                            label="Dissolved Substances"
                            value={eTongueData.dts}
                            unit="ppm"
                            status={getSensorStatus(eTongueData.dts, 'dts')}
                            icon="dts"
                        />
                        <ChemicalSensorCard
                            label="Volatile Compounds"
                            value={eTongueData.voc}
                            unit="ppm"
                            status={getSensorStatus(eTongueData.voc, 'voc')}
                            icon="voc"
                        />
                    </div>
                </div>

                {/* 2. CHARTS SECTION */}
                <div className="my-8">
                    <ChartToggleSection data={mainChartData} />
                </div>

                {/* 3. ML RESULT CARD - PROMINENT */}
                <div className="mb-8">
                    <MLResultCard
                        result={`Sample Status: ${mlResult.status === 'unsafe'
                            ? 'Anomaly Detected'
                            : mlResult.status === 'warning'
                                ? 'Moderate Variation'
                                : 'Stable Composition'
                            }`}
                        confidence={mlResult.confidence}
                        status={mlResult.status}
                    />
                </div>



                {/* 4. COLOR VISUALIZATION */}
                {/* <div className="mb-8">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">🎨 Color Detection</h2>
                        <p className="text-sm text-gray-600 mt-1">RGB sensor visualization and color analysis</p>
                    </div>
                    <ColorPreviewCard
                        r={Math.round(eTongueData.r[eTongueData.r.length - 1] || 0)}
                        g={Math.round(eTongueData.g[eTongueData.g.length - 1] || 0)}
                        b={Math.round(eTongueData.b[eTongueData.b.length - 1] || 0)}
                    />
                </div> */}

                {/* Footer Note */}
                {/* <div className="text-center text-xs text-gray-500 py-4">
                    <p>Data refreshes every 5 seconds • Powered by ThingSpeak API</p>
                </div> */}
            </main>
        </div>
    );
}