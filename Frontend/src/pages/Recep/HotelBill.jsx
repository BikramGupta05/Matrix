import {MapPin,Phone,Mail,Calendar,User,CreditCard,Download,Printer,CheckCircle,Clock,Sparkles,} from "lucide-react";

import html2pdf from "html2pdf.js";

import hotelLogo from "../../assets/hotellogo.png";
import logoText from "../../assets/logoText.png";

export function HotelBill() {
  const billData = {
    hotelName: "BAristocrat By Baizus Hotels & Resorts",
    address: "N C. Goenka Rd, Chauk Bazaar",
    city: "Darjeeling, West Bengal 734101",
    phone: "+91 98765 43210",
    email: "info@baizushotels.com",
    gstin: "29ABCDE1234F1Z5",
    billNumber: "BHR-2024-005678",
    date: "24 Dec 2024",
    guest: {
      name: "Priya Sharma",
      mobile: "+91 98765 43210",
      email: "priya.sharma@email.com",
      aadhaar: "XXXX-XXXX-4321",
      room: "305",
      roomType: "Deluxe Double Room",
      checkIn: "20 Dec 2024 at 14:00",
      checkOut: "24 Dec 2024 at 11:00",
      nights: 4,
      guests: 2,
    },
    charges: [
      {
        description: "Deluxe Double Room - Room 305",
        quantity: 4,
        rate: 3500,
        amount: 14000,
      },
    ],
    payment: {
      method: "Cash",
      status: "Paid",
      advancePaid: 14000,
    },
  };

  const subtotal = billData.charges.reduce(
    (sum, charge) => sum + charge.amount,
    0
  );
  const total = subtotal;
  const balanceDue = total - billData.payment.advancePaid;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const element = document.getElementById("bill-a4");

    html2pdf()
      .set({
        margin: 10,
        filename: `Hotel-Bill-${billData.billNumber}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-6">

      {/* ACTION BUTTONS (OUTSIDE BILL) */}
      <div className="flex justify-center gap-4 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-8 py-4 bg-gray-700 text-white rounded-xl"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white rounded-xl"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
      </div>

      {/* ================= A4 BILL ================= */}
      <div
        id="bill-a4"
        className="mx-auto bg-white shadow-2xl"
        style={{ width: "210mm", minHeight: "297mm" }}
      >

        {/* HEADER */}
        <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-1 avoid-break">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
            <div className="flex justify-between gap-6">
              <div className="flex gap-6">
                <img src={hotelLogo} alt="Logo" className="w-20 h-20" />
                <div>
                  <img src={logoText} alt="Hotel Name" className="h-12 mb-3" />
                  <div className="text-yellow-100 text-sm space-y-1">
                    <div className="flex gap-2 items-center">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      {billData.address}
                    </div>
                    <div className="flex gap-2 items-center">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      {billData.city}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Phone className="w-4 h-4 text-yellow-500" />
                      {billData.phone}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Mail className="w-4 h-4 text-yellow-500" />
                      {billData.email}
                    </div>
                    <div>
                      <span className="text-yellow-500">GSTIN:</span>{" "}
                      {billData.gstin}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right bg-yellow-600/10 p-4 rounded-lg">
                <div className="text-yellow-400 text-sm">Date</div>
                <div className="text-white text-xl">{billData.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* GUEST + BOOKING */}
        <div className="grid grid-cols-2 border-b avoid-break">
          <div className="p-8 bg-gray-50">
            <h2 className="text-xl mb-4">Guest Details</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <User className="w-5 h-5 text-yellow-600" />
                {billData.guest.name}
              </div>
              <div className="flex gap-2">
                <Phone className="w-5 h-5 text-yellow-600" />
                {billData.guest.mobile}
              </div>
              <div className="flex gap-2">
                <Mail className="w-5 h-5 text-yellow-600" />
                {billData.guest.email}
              </div>
              <div className="flex gap-2">
                <CreditCard className="w-5 h-5 text-yellow-600" />
                {billData.guest.aadhaar}
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl mb-4">Booking Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>Room: {billData.guest.room}</div>
              <div>{billData.guest.roomType}</div>
              <div>Guests: {billData.guest.guests}</div>
              <div>Nights: {billData.guest.nights}</div>
              <div className="col-span-2">Check-in: {billData.guest.checkIn}</div>
              <div className="col-span-2">Check-out: {billData.guest.checkOut}</div>
            </div>
          </div>
        </div>

        {/* CHARGES */}
        <div className="p-8 avoid-break">
          <h2 className="text-2xl mb-4">Charges Breakdown</h2>

          {billData.charges.map((c, i) => (
            <div key={i} className="flex justify-between border p-4 rounded mb-4">
              <div>
                <div className="font-semibold">{c.description}</div>
                <div className="text-sm text-gray-600">
                  {c.quantity} Nights × ₹{c.rate}
                </div>
              </div>
              <div className="text-xl text-yellow-600">
                ₹{c.amount.toLocaleString("en-IN")}
              </div>
            </div>
          ))}

          <div className="w-80 ml-auto border rounded">
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid</span>
                <span>₹{billData.payment.advancePaid}</span>
              </div>
              <div className="flex justify-between font-semibold text-green-600">
                <span>Balance</span>
                <span>₹{balanceDue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT + TERMS */}
        <div className="grid grid-cols-2 border-t avoid-break">
          <div className="p-8 bg-gray-50 border-r">
            <h2 className="text-xl mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold">{billData.payment.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Status:</span>
                <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  {billData.payment.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl mb-4">Terms & Conditions</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                Check-out time is 11:00 AM
              </li>
              <li>• Late check-out may incur additional charges</li>
              <li>• Damage to hotel property will be charged</li>
              <li>• No refund policy applicable</li>
              <li>• All disputes subject to local jurisdiction</li>
            </ul>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-8 text-center avoid-break">
          <div className="flex justify-center gap-2 text-yellow-100 text-lg mb-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Thank you for choosing Baizus Hotels & Resorts
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-yellow-200/60 text-sm">
            This is a computer-generated bill and does not require a signature.
          </p>
        </div>

      </div>
    </div>
  );
}
