import React from "react";
import {
  Font,
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import font from "../../asset/font/cwTeXKai-zhonly.ttf";

//create font
Font.register({
  family: "cwTeXKai-zhonly",
  src: font,
});
const BORDER_COLOR = "1 solid black";
const divBy14 = (text) => {
  if (!text) {
    return [];
  }
  const textArr = text.split("");
  let newtextArr = [];
  while (textArr.length >= 14) {
    newtextArr.push(textArr.splice(0, 14).join(""));
  }
  newtextArr.push(textArr.splice(0, 14).join(""));
  return newtextArr;
};

//create style
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "flex",
    flexDirection: "column",
    fontFamily: "cwTeXKai-zhonly",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  projectName: { fontSize: 14, marginBottom: "2%", textAlign: "left" },
  projectContentText: {
    textAlign: "left",
    whiteSpace: "normal",
  },
  projectDescription: { width: "100%", height: "30%", padding: "1%" },
  projectCate: {
    borderBottom: BORDER_COLOR,
    width: "100%",
    height: "30%",
    padding: "1%",
  },
});

// create one photo div
const PhotoDiv = ({ id, title, image, date, note, number }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderTop: BORDER_COLOR,
        flex: 1,
      }}
    >
      <View
        style={{
          borderRight: BORDER_COLOR,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "2%",
          width: "65%",
        }}
      >
        {image ? <Image style={{ objectFit: "contain" }} src={image} /> : null}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <View
          style={{
            borderBottom: BORDER_COLOR,
            width: "100%",
            height: "15%",
            padding: "1%",
          }}
        >
          <Text style={styles.projectContentText}>拍攝日期: {date}</Text>
        </View>
        <View
          style={{
            borderBottom: BORDER_COLOR,
            width: "100%",
            height: "15%",
            padding: "1%",
          }}
        >
          <Text style={styles.projectContentText}>契約項次: {number}</Text>
        </View>
        <View style={styles.projectCate}>
          <Text style={styles.projectContentText}>工程項目:</Text>
          {title && divBy14(title).length ? (
            divBy14(title).map((c, i) => <Text key={"title" + i}>{c}</Text>)
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.projectDescription}>
          <Text style={styles.projectContentText}>說明:</Text>
          {note && divBy14(note).length ? (
            divBy14(note).map((c, i) => <Text key={"note" + i}>{c}</Text>)
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </View>
  );
};

const SinglePage = ({ projectInfo, cardForThree }) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={{ marginBottom: "2%" }}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: "3%",
            fontSize: 30,
          }}
        >
          施工照片
        </Text>
        <Text style={styles.projectName}>
          工程名稱 : {projectInfo.projectName}
        </Text>
        <Text style={styles.projectName}>
          監造單位 : {projectInfo.designer}
        </Text>
        <View
          style={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            施工承商 : 和碁營造股份有限公司
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: BORDER_COLOR,
          borderTop: "none",
          flex: 1,
        }}
      >
        {cardForThree.map(({ id, image, title, number, note, date }) => (
          <PhotoDiv
            key={id}
            title={title}
            image={image}
            date={date}
            number={number}
            note={note}
          />
        ))}
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

// Create Document Component
const ComponentToPrint = ({ projectInfo, cardListForPdf }) => {
  let resortCards = [];
  while (cardListForPdf.length >= 3) {
    const batchArr = cardListForPdf.splice(0, 3);
    resortCards.push(batchArr);
  }

  return (
    <Document file="image.pdf">
      {resortCards.map((batch, i) => (
        <SinglePage
          projectInfo={projectInfo}
          key={"batch" + i}
          cardForThree={batch}
        />
      ))}
    </Document>
  );
};

export default ComponentToPrint;
