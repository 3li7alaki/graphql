import dynamic from "next/dynamic";
import {useUser} from "@/contexts/UserContext";
import {useEffect, useState} from "react";
import {getXPProgression} from "@/utils/graphql";
import {formatBytes} from "@/utils/misc";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Xp() {
    const { user } = useUser();
    const [ isMounted, setIsMounted ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        if (!isMounted) {
            getXPProgression(user?.token as string, user?.id as number).then((rawData) => {
                const sortedData = rawData.sort((a, b) => a.date - b.date);

                const monthlyData = {};
                let cumulativeXP = 0;

                sortedData.forEach((item) => {
                    const date = new Date(item.date);
                    const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });

                    cumulativeXP += item.xp;

                    // Update or set the XP for this month
                    monthlyData[monthKey] = cumulativeXP;
                });

                // Get the last 12 months of data
                const months = Object.keys(monthlyData);

                const categories = months

                const data = months.map(month => monthlyData[month]);

                setData(data);
                setCategories(categories);
            });
            setIsMounted(true);
        }
    }, [isMounted, user]);

    const options = {
        series: [{
            name: 'series1',
            data: data
        }],
        chart: {
            height: 250,
            type: 'area',
            toolbar: {
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 3,
            colors: ['var(--tw-primary)']
        },
        xaxis: {
            categories: categories,
            axisBorder: {
                show: false,
            },
            maxTicks: 12,
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: 'var(--tw-gray-500)',
                    fontSize: '12px'
                }
            },
            crosshairs: {
                position: 'front',
                stroke: {
                    color: 'var(--tw-primary)',
                    width: 1,
                    dashArray: 3
                }
            },
            tooltip: {
                enabled: false,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            min: 0,
            max: Math.max(...data) * 1.1,
            tickAmount: 5,
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: 'var(--tw-gray-500)',
                    fontSize: '10px'
                },
                formatter: formatBytes
            }
        },
        tooltip: {
            enabled: true,
            custom({series, seriesIndex, dataPointIndex}) {
                const number = parseInt(series[seriesIndex][dataPointIndex]);
                const monthName = categories[dataPointIndex];

                const percentage = Math.round((number / data[data.length - 1]) * 100);


                const formattedNumber = formatBytes(number)

                return (
                    `
<div class="flex flex-col gap-2 p-3.5">
 <div class="font-medium text-2sm text-gray-600">
  ${monthName}
 </div>
 <div class="flex items-center gap-1.5">
  <div class="font-semibold text-md text-gray-900">
   ${formattedNumber}
  </div>
  <span class="badge badge-outline badge-success badge-xs">
   +${percentage}%
  </span>
 </div>
</div>
`
                );
            }
        },
        markers: {
            size: 0,
            colors: 'var(--tw-primary-light)',
            strokeColors: 'var(--tw-primary)',
            strokeWidth: 4,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: 8,
                sizeOffset: 0
            }
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.25,
                opacityTo: 0
            }
        },
        grid: {
            borderColor: 'var(--tw-gray-200)',
            strokeDashArray: 5,
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: true
                }
            },
            xaxis: {
                lines: {
                    show: false
                }
            },
        },
    };

    return (
        <div className="flex-grow items-center justify-center">
            <ApexChart
                options={options}
                series={options.series}
                height={200}
            />
        </div>
    );
}
