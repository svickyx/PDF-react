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
  document: {
    "@media max-width: 400": {
      width: "50%",
      height: "50%",
    },
  },
  page: {
    padding: "10%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "cwTeXKai-zhonly",
    fontSize: 16,
  },
  bigTitle: { textAlign: "center" },
});

const BORDER_COLOR = "1 solid gray";

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
          flex: 1,
          borderRight: BORDER_COLOR,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "2%",
        }}
      >
        <Image style={{ objectFit: "contain" }} src={imagesUrl} />
      </View>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2%",
        }}
      >
        <Text>日期: {date}</Text>
        <Text>標題: {title}</Text>
        <Text>契約項次: {number}</Text>
        <Text>說明: {note}</Text>
      </View>
    </View>
  );
};

// Create Document Component
const ComponentToPrint = ({ imagesUrls, completedDescriptions }) => {
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View style={{ paddingBottom: "5%" }}>
          <Text
            style={{
              textAlign: "center",
              paddingBottom: "2%",
              fontSize: 20,
            }}
          >
            竣工照片
          </Text>
          <Text style={{ fontSize: 16 }}>
            工程名稱:教學區週邊排水溝及運動場東側通道連鎖磚改善工程
          </Text>
          <Text style={{ fontSize: 16 }}>施工廠商:和諅營造股份有限公司</Text>
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
