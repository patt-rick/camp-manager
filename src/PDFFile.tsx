import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import image from "../Assets/background.png";
import image2 from "../Assets/profile.png";

Font.register({
    family: "Inter",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
            fontWeight: 200,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
            fontWeight: 300,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
            fontWeight: 400,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
            fontWeight: 500,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
            fontWeight: 600,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
            fontWeight: 700,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
            fontWeight: 800,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
            fontWeight: 900,
        },
    ],
});

const Card = (props: { name: any; classification: any; branch: any; date: any }) => {
    return (
        <View style={styles.card}>
            <View style={styles.main}>
                <View style={styles.img}>
                    <Image src={image2} style={styles.profileImage} />
                </View>
                <View style={styles.details}>
                    <View style={styles.name}>
                        <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>{props.name}</Text>
                    </View>
                    <View style={styles.phone}>
                        <Text style={{ fontFamily: "Inter", fontWeight: 300 }}>
                            {props.classification}
                        </Text>
                    </View>
                    <View style={styles.branch}>
                        <Text style={{ fontFamily: "Inter", fontWeight: 400 }}>{props.branch}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text
                    style={{ fontFamily: "Inter", fontWeight: 700 }}
                >{`Youth Camp ${props.date}`}</Text>
            </View>
            <Image fixed src={image} style={styles.backgroundImage} />
        </View>
    );
};
export const PDFFile = ({ data, year }: any) => {
    const itemsPerPage = 10;

    const chunkArray = (arr: any[], size: number) => {
        return arr.reduce((chunks: any, item: any, i: number) => {
            if (i % size === 0) {
                chunks.push([item]);
            } else {
                chunks[chunks.length - 1].push(item);
            }
            return chunks;
        }, []);
    };

    const dataChunks = chunkArray(data, itemsPerPage);

    return (
        <Document>
            {dataChunks.map((chunk: any[], pageIndex: any) => (
                <Page key={pageIndex}>
                    <View style={styles.flex}>
                        {chunk.map(
                            (
                                person: { name: any; classification: any; temple: any },
                                index: any
                            ) => (
                                <Card
                                    key={index}
                                    name={person.name}
                                    classification={person.classification}
                                    branch={person.temple}
                                    date={year}
                                />
                            )
                        )}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "5px",
    },
    profileImage: {
        height: "100%",
        width: "100%",
    },
    card: {
        margin: "10px",
        width: "260px",
        height: "140px",
        backgroundColor: "#f7f7f7",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
    },
    main: {
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        gap: "6px",
        alignItems: "center",
        height: "100%",
    },
    img: {
        height: "70px",
        width: "70px",
        border: "2px solid #56ba60",
    },
    details: {
        minWidth: "160px",
        maxWidth: "170px",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        color: "#444",
        alignItems: "flex-start",
    },
    footer: {
        height: "30px",
        backgroundColor: "#242439ad",
        color: "#fff",
        fontWeight: "extrabold",
        fontSize: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: "13px",
        textTransform: "uppercase",
        color: "#222",
        fontWeight: "bold",
    },
    branch: {
        marginTop: "6px",
        paddingTop: "6px",
        width: "100%",
        borderTop: "1px solid #ccc",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: "10px",
    },
    phone: { fontWeight: 300, marginTop: "6px", fontSize: "10px" },
    backgroundImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
        opacity: 0.1,
        top: 0,
        left: "0%",
        // right: 0
    },
});
