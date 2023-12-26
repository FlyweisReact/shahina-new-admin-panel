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
      {({ blob, url, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error loading PDF</div>;
        }

        return (
          <div>
            <PDFViewer width="1000" height="600">
              <iframe
                title="pdf"
                src={
                  "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf"
                }
                width="100%"
                height="100%"
              />
            </PDFViewer>
          </div>
        );
      }}
    </BlobProvider>
  );
};

export default PdfViewer;
