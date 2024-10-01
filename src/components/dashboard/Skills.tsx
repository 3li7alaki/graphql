import dynamic from "next/dynamic";
import {useUser} from "@/contexts/UserContext";
import {useEffect, useState} from "react";
import {getSkills} from "@/utils/graphql";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Languages = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'python': 'Python',
    'go': 'Go',
    'html': 'HTML',
    'css': 'CSS',
    'java': 'Java',
    'c': 'C',
    'cpp': 'C++',
    'rust': 'Rust',
}

export default function Skills() {
    const { user } = useUser();
    const [ skills, setSkills ] = useState([] as { skill: string, percentage: number }[]);
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            getSkills(user?.token as string).then((data) => {
                setSkills(Object.entries(data)
                    .filter(([key, value]) => key in Languages)
                    .map(([key, value]) => ({ skill: Languages[key], percentage: value })) as { skill: string, percentage: number }[]);
                    // .map(([key, value]) => ({ skill: key, percentage: value })));
            });
            setIsMounted(true);
        }
    }, [isMounted, user]);

    const options = {
        series: [{
            name: "Skills",
            data: skills.map(skill => skill.percentage),
        }],
        labels: skills.map(skill => skill.skill),
        stroke: {
            width: 2,
            opacity: 0.5
        },
        xaxis: {
            categories: skills.map(skill => skill.skill),
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            show: false,
            labels: {
                hideOverlappingLabels: true,
                formatter: function (val) {
                    return val + "%";
                },
            }
        },

    };


    return (
        <>
            <ApexChart options={options} series={options.series} type="radar" height={350} />
        </>
    );
}
