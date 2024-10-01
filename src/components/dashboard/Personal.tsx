import {useUser} from "@/contexts/UserContext";
import {getRank} from "@/utils/misc";

export default function Personal() {
    const { user } = useUser();


    const rank = getRank(user?.level as number);


    return (
        <>
            <div className="flex items-center justify-center gap-1.5 mb-2.5">
                <a className="hover:text-primary-active text-base leading-5 font-medium text-gray-900 text-xl">
                    {user?.firstName} {user?.lastName}
                </a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-7">
                <div className="flex items-center text-sm">
                    <i className="ki-filled ki-user me-1 text-gray-500">
                    </i>
                    <a className="text-gray-700 hover:text-primary-active">
                        {user?.login}
                    </a>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                    <i className="ki-filled ki-joystick me-1 text-gray-500">
                    </i>
                    {rank}
                </div>
            </div>
            <div className="flex items-center justify-center gap-2.5">
                <a href={"https://learn.reboot01.com/git/"+user?.login}>
                    <button className="btn btn-success">
                        <i className="ki-outline ki-github">
                        </i>
                        Git
                    </button>
                </a>
            </div>
        </>
    );
}