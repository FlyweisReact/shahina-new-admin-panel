/** @format */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
    </Page>
  </Document>
);

const PdfViewer = () => {
  const pdfUrl =
    "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf";

  return (
    <BlobProvider document={<MyDocument />}>
      <PDFViewer width="1000" height="600">
        <iframe title="pdf" src={pdfUrl} width="100%" height="100%" />
      </PDFViewer>
    </BlobProvider>
  );
};

export default PdfViewer;
