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

//create style
const styles = StyleSheet.create({
  page: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "5%",
    paddingTop: "5%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "cwTeXKai-zhonly",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  bigTitle: { textAlign: "center" },
  projectName: { fontSize: 14, marginBottom: "2%", textAlign: "left" },
  projectContentText: { textAlign: "left", height: "100%" },
  projectDescription: { width: "100%", height: "30%", padding: "1%" },
});

const BORDER_COLOR = "1 solid black";

// create one photo div
const PhotoDiv = ({ title, imagesUrl, date, note, number }) => {
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
        <Image style={{ objectFit: "contain" }} src={imagesUrl} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "35%",
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
        <View
          style={{
            borderBottom: BORDER_COLOR,
            width: "100%",
            height: "30%",
            padding: "1%",
          }}
        >
          <Text style={styles.projectContentText}>工程項目: {title}</Text>
        </View>
        <View style={styles.projectDescription}>
          <Text style={styles.projectContentText}>說明: {note}</Text>
        </View>
      </View>
    </View>
  );
};

// Create Document Component
const ComponentToPrint = ({ imagesUrls, completedDescriptions }) => {
  return (
    <Document file="image.pdf">
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: "2%" }}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: "3%",
              fontSize: 30,
              textAlign: "left",
            }}
          >
            施工照片
          </Text>
          <Text style={styles.projectName}>
            工程名稱 : 教學區週邊排水溝及運動場東側通道連鎖磚改善工程
          </Text>
          <Text style={styles.projectName}>監造單位 : 律師事務所</Text>
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
            <Text style={{ fontSize: 14 }}>第一頁</Text>
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
          {completedDescriptions.map(({ title, number, note, date }, i) => (
            <PhotoDiv
              key={title + i}
              title={title}
              imagesUrl={imagesUrls[i]}
              date={date}
              number={number}
              note={note}
            />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ComponentToPrint;
