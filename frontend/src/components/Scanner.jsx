import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const Scanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

    scanner.render(
      async (decodedText) => {
        try {
          const BACKEND_URL = "https://qr-code-p1ne.onrender.com";
          await axios.post(`${BACKEND_URL}/api/attendance`, { qrCode: decodedText });

          alert("✅ Attendance marked: " + decodedText);

          setTimeout(() => {
            scanner.clear();
          }, 2000); // Clear scanner after 2 seconds
        } catch (err) {
          alert("❌ Already marked or error");
        }
      },
      (err) => {
        // handle scan errors silently
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="scanner">
      <h2>Scan QR Code</h2>
      <div id="qr-reader" style={{ width: "300px" }}></div>
    </div>
  );
};

export default Scanner;
