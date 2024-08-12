import React, { useEffect, useState } from 'react';
import PDFMerger from 'pdf-merger-js';

const MergePDFs = ({ applicantDocuments }) => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  useEffect(() => {
    const mergePDFs = async () => {
      const merger = new PDFMerger();

      for (const document of applicantDocuments) {
        await merger.add(document.filePath, [1, 3]);
      }

      await merger.setMetadata({
        producer: 'Recruitment System'
      });

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);

      setMergedPdfUrl(url);
    };


    if (applicantDocuments.length > 0) {
      mergePDFs().catch(err => {
        console.error('Error merging PDFs:', err);
      });
    }

    return () => {
      if (mergedPdfUrl) {
        URL.revokeObjectURL(mergedPdfUrl);
      }
    };
  }, [applicantDocuments]);

  if (!mergedPdfUrl) {
    return <>Loading...</>;
  }

  return (
    <iframe
      title='pdf-viewer'
      src={mergedPdfUrl}
      width='100%'
      height='1000px'
      frameBorder='0'
    />
  );
};

export default MergePDFs;
