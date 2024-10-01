import {useUser} from "@/contexts/UserContext";
import {formatBytes} from "@/utils/misc";
import {useEffect, useState} from "react";
import {getSkills, getUserData} from "@/utils/graphql";

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

export default function Progress() {
    const { user, dispatch } = useUser();
    const [ skills, setSkills ] = useState([] as { skill: string, percentage: number }[]);
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            getSkills(user?.token as string).then((data) => {
                setSkills(Object.entries(data)
                    .filter(([key, value]) => !(key in Languages))
                    .map(([key, value]) => ({ skill: key, percentage: value } as { skill: string, percentage: number }))
                    .sort((a, b) => b.percentage - a.percentage) as { skill: string, percentage: number }[]);
            });

            if (user) {
                getUserData(user?.token as string).then((data) => {
                    dispatch({ type: 'SET_USER', payload: data });
                });
            }
            setIsMounted(true);
        }
    }, [dispatch, isMounted, user]);

    return (
        <>
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-normal text-gray-700 items-center">
                 XP
                </span>
                <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-semibold text-gray-900">
                       {formatBytes(user?.xp as number)}
                    </span>
                    <span className="badge badge-outline badge-success badge-sm">
                        LVL {user?.level}
                    </span>
                </div>
                <div className="overflow-y-auto max-h-32 hide-scroll">
                    {skills.map(({skill, percentage}, index) => (
                        <div key={index}>
                        <span className="text-sm text-gray-700 font-semibold">
                            {skill}
                        </span>
                            <div className={"progress "+(percentage === 100 ? 'progress-success' : percentage > 15 ? 'progress-primary' : '')}>
                                <div className="progress-bar" style={{width: percentage+'%'}}>
                                    <span className="text-light text-sm">{percentage}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}