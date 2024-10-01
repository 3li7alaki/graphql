import {useUser} from "@/contexts/UserContext";
import {formatBytes} from "@/utils/misc";
import {getAuditData} from "@/utils/graphql";
import {useEffect, useState} from "react";

export default function Audit() {
    const { user } = useUser();
    const [ isMounted, setIsMounted ] = useState(false);
    const [ auditData, setAuditData ] = useState({
        count: 0,
        up: 0,
        down: 0,
        ratio: 0
    });

    useEffect(() => {
        if (!isMounted) {
            getAuditData(user?.token as string, user?.id as number).then((data) => {
                setAuditData(data);
            });
            setIsMounted(true);
        }
    }, [isMounted, user]);

    return (
        <>
            <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5">
                <div className="grid grid-cols-1 gap-1.5 border-[0.5px] rounded-md px-2.5 py-2 shrink-0 min-w-18 max-w-auto badge badge-outline badge-primary">
                     <span className="text-xs leading-none font-bold">
                      {auditData?.count}
                     </span>
                    <span className="text-2xs">
                      Audits
                     </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 border-[0.5px] rounded-md px-2.5 py-2 shrink-0 min-w-18 max-w-auto badge badge-outline badge-info">
                     <span className="text-xs leading-none font-bold">
                      {auditData?.ratio?.toFixed(2)}
                     </span>
                    <span className="text-2xs">
                      Audit Ratio
                     </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 border-[0.5px] rounded-md px-2.5 py-2 shrink-0 min-w-18 max-w-auto badge badge-outline badge-success">
                     <span className="text-xs leading-none font-bold">
                      {formatBytes(auditData?.up)}
                     </span>
                    <span className="text-2xs">
                      Done
                     </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 border-[0.5px] rounded-md px-2.5 py-2 shrink-0 min-w-18 max-w-auto badge badge-outline badge-danger">
                     <span className="text-xs leading-none font-bold">
                      {formatBytes(auditData?.down)}
                     </span>
                    <span className="text-2xs">
                      Received
                     </span>
                </div>
            </div>
        </>
    );
}