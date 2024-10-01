export default function Card({ children, header }) {
    return (
        <div className="card max-w-md mx-auto hover:shadow-lg rounded-lg dark:bg-coal-600 transition">
            {header !== 'None' ? (
                <div className="card-header">
                    <h2 className="card-title">{header}</h2>
                    {/*<button className="btn btn-sm btn-icon btn-light btn-clear">*/}
                    {/*    <i className="ki-outline ki-dots-vertical">*/}
                    {/*    </i>*/}
                    {/*</button>*/}
                </div>
            ) : <></>}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}