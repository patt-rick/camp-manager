import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { ClassificationColors } from "./_helpers/staticData";

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

const Card = (props: {
    firstName: any;
    lastName: any;
    classification: any;
    gender: any;
    church: any;
    code: any;
}) => {
    return (
        <View wrap={false} style={styles.card}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                }}
            >
                <View style={styles.img}>
                    <Image src={props.code} style={styles.profileImage} />
                </View>
            </View>
            <View style={styles.details}>
                <View
                    style={{
                        ...styles.bar,
                        backgroundColor:
                            ClassificationColors[
                                props.classification as keyof typeof ClassificationColors
                            ],
                    }}
                >
                    <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>OYC '24</Text>
                </View>
                <View style={{ textAlign: "center", padding: "2px" }}>
                    <View style={styles.name}>
                        <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>
                            {props.lastName + " " + props.firstName}
                        </Text>
                    </View>
                    <View style={styles.phone}>
                        <Text style={{ fontFamily: "Inter", fontWeight: 500 }}>{props.church}</Text>
                    </View>
                    <View style={styles.down}>
                        <View>
                            <Text style={{ fontFamily: "Inter", fontWeight: 300 }}>
                                {props.classification}
                            </Text>
                        </View>
                        <View style={{ borderRight: "1px solid #ddd", height: "12px" }}></View>
                        <View>
                            <Text style={{ fontFamily: "Inter", fontWeight: 300 }}>
                                {props.gender}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: "10px", textAlign: "center", paddingBottom: "4px" }}>
                    <Text
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 200,
                            color: "#aaa",
                            fontSize: "9px",
                        }}
                    >
                        scan QR CODE for your meals
                    </Text>
                </View>
            </View>
        </View>
    );
};
export const PDFFile = ({ data }: any) => {
    return (
        <Document>
            <Page>
                <View style={styles.flex}>
                    {data.map((person: any, index: any) => (
                        <Card
                            key={index}
                            firstName={person.first_name}
                            lastName={person.last_name}
                            gender={person.gender}
                            classification={person.classification}
                            church={person.church}
                            code={person.code}
                        />
                    ))}
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "3px",
    },
    profileImage: {
        height: "100%",
        width: "100%",
    },
    card: {
        margin: "10px",
        width: "150px",
        height: "260px",
        backgroundColor: "#f7f7f7",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
        height: "110px",
        width: "110px",
        margin: "5px auto",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    bar: {
        textAlign: "center",
        fontWeight: "ultrabold",
        fontSize: "13px",
        color: "white",
        height: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: "12px",
        color: "#222",
        fontWeight: "bold",
        margin: "10px 0px",
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
    phone: { fontWeight: 500, marginTop: "6px", fontSize: "10px" },
    down: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "6px",
        fontSize: "10px",
        margin: "8px 0px",
    },
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
