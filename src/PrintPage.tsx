import IdCard from "./IdCard";

const PrintPage = (props: {
    onCancel: () => void;
    onPrint: () => void;
    data: any[];
    year: any;
}) => {
    return (
        <div>
            <div className="btn-wrap">
                <button
                    style={{ color: "darkred", borderColor: "darkred" }}
                    className="btn"
                    onClick={() => props.onCancel()}
                >
                    cancel
                </button>
                <button className="btn" onClick={() => props.onPrint()}>
                    print
                </button>
            </div>

            <div className="print-page">
                {props.data.map((data, i) => (
                    <IdCard
                        key={i}
                        name={data.name}
                        branch={data.temple}
                        phone={data.classification}
                        date={props.year}
                    />
                ))}
            </div>
        </div>
    );
};

export default PrintPage;
