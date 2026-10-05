// Seed data representing a verified donor network maintained by district coordinators.
// In production this is replaced by coordinator-submitted records persisted to a backend.
export const DONORS = [
  { id: "D-1042", name: "Arun Nair", bloodGroup: "O-", district: "Ernakulam", phone: "+91 98470 11223", lastDonation: "2026-07-12", available: true, verifiedBy: "C-EKM-01" },
  { id: "D-1043", name: "Divya Menon", bloodGroup: "A+", district: "Ernakulam", phone: "+91 94470 22334", lastDonation: "2026-05-02", available: true, verifiedBy: "C-EKM-01" },
  { id: "D-1044", name: "Sudheer Varma", bloodGroup: "B+", district: "Thiruvananthapuram", phone: "+91 97440 33445", lastDonation: "2026-08-20", available: false, verifiedBy: "C-TVM-02" },
  { id: "D-1045", name: "Lakshmi Pillai", bloodGroup: "O+", district: "Thiruvananthapuram", phone: "+91 96330 44556", lastDonation: "2026-04-18", available: true, verifiedBy: "C-TVM-02" },
  { id: "D-1046", name: "Mohammed Riyaz", bloodGroup: "AB+", district: "Kozhikode", phone: "+91 95670 55667", lastDonation: "2026-06-29", available: true, verifiedBy: "C-KKD-01" },
  { id: "D-1047", name: "Fathima Beevi", bloodGroup: "B-", district: "Kozhikode", phone: "+91 94950 66778", lastDonation: "2026-03-11", available: true, verifiedBy: "C-KKD-01" },
  { id: "D-1048", name: "Vishnu Prasad", bloodGroup: "O-", district: "Thrissur", phone: "+91 98460 77889", lastDonation: "2026-08-02", available: false, verifiedBy: "C-TSR-01" },
  { id: "D-1049", name: "Anjali Krishnan", bloodGroup: "A-", district: "Thrissur", phone: "+91 97470 88990", lastDonation: "2026-02-14", available: true, verifiedBy: "C-TSR-01" },
  { id: "D-1050", name: "Rahul Chandran", bloodGroup: "O+", district: "Kollam", phone: "+91 96050 99001", lastDonation: "2026-07-30", available: true, verifiedBy: "C-KLM-01" },
  { id: "D-1051", name: "Nithya Suresh", bloodGroup: "AB-", district: "Kollam", phone: "+91 94000 10112", lastDonation: "2026-01-25", available: true, verifiedBy: "C-KLM-01" },
  { id: "D-1052", name: "Jaison Thomas", bloodGroup: "B+", district: "Kottayam", phone: "+91 98950 21223", lastDonation: "2026-06-05", available: true, verifiedBy: "C-KTM-01" },
  { id: "D-1053", name: "Reshma Joseph", bloodGroup: "O+", district: "Kottayam", phone: "+91 97340 32334", lastDonation: "2026-08-15", available: false, verifiedBy: "C-KTM-01" },
  { id: "D-1054", name: "Hari Kumar", bloodGroup: "A+", district: "Palakkad", phone: "+91 96290 43445", lastDonation: "2026-05-28", available: true, verifiedBy: "C-PKD-01" },
  { id: "D-1055", name: "Sabitha Raj", bloodGroup: "O-", district: "Malappuram", phone: "+91 95260 54556", lastDonation: "2026-07-07", available: true, verifiedBy: "C-MPM-01" },
  { id: "D-1056", name: "Noufal Ahmed", bloodGroup: "B+", district: "Malappuram", phone: "+91 94470 65667", lastDonation: "2026-03-22", available: true, verifiedBy: "C-MPM-01" },
  { id: "D-1057", name: "Deepa Baby", bloodGroup: "AB+", district: "Alappuzha", phone: "+91 98470 76778", lastDonation: "2026-04-09", available: true, verifiedBy: "C-ALP-01" },
  { id: "D-1058", name: "Saneesh Kumar", bloodGroup: "O+", district: "Kannur", phone: "+91 97440 87889", lastDonation: "2026-08-28", available: false, verifiedBy: "C-KNR-01" },
  { id: "D-1059", name: "Athira Vijayan", bloodGroup: "A-", district: "Kannur", phone: "+91 96330 98990", lastDonation: "2026-02-19", available: true, verifiedBy: "C-KNR-01" },
  { id: "D-1060", name: "Pradeep Menon", bloodGroup: "O-", district: "Idukki", phone: "+91 95670 09001", lastDonation: "2026-06-17", available: true, verifiedBy: "C-IDK-01" },
  { id: "D-1061", name: "Sreelakshmi S", bloodGroup: "B-", district: "Wayanad", phone: "+91 94950 10112", lastDonation: "2026-05-13", available: true, verifiedBy: "C-WYD-01" },
  { id: "D-1062", name: "Abhilash Raveendran", bloodGroup: "A+", district: "Pathanamthitta", phone: "+91 98460 21223", lastDonation: "2026-07-24", available: true, verifiedBy: "C-PTA-01" },
  { id: "D-1063", name: "Kavya Mohan", bloodGroup: "O+", district: "Kasaragod", phone: "+91 97470 32334", lastDonation: "2026-08-10", available: true, verifiedBy: "C-KSD-01" },
];

export const COORDINATORS = [
  { id: "C-EKM-01", name: "Dr. Priya Thampi", district: "Ernakulam", phone: "+91 90000 11111", donorsManaged: 2, network: ["C-TSR-01", "C-KTM-01"] },
  { id: "C-TVM-02", name: "Biju Sankar", district: "Thiruvananthapuram", phone: "+91 90000 22222", donorsManaged: 2, network: ["C-KLM-01", "C-PTA-01"] },
  { id: "C-KKD-01", name: "Shahina Rahman", district: "Kozhikode", phone: "+91 90000 33333", donorsManaged: 2, network: ["C-MPM-01", "C-WYD-01"] },
  { id: "C-TSR-01", name: "Vineeth Balan", district: "Thrissur", phone: "+91 90000 44444", donorsManaged: 2, network: ["C-EKM-01", "C-PKD-01"] },
  { id: "C-KLM-01", name: "Reji Mathew", district: "Kollam", phone: "+91 90000 55555", donorsManaged: 2, network: ["C-TVM-02", "C-ALP-01"] },
  { id: "C-KTM-01", name: "Anitha George", district: "Kottayam", phone: "+91 90000 66666", donorsManaged: 2, network: ["C-EKM-01", "C-IDK-01"] },
];

export function findDonors({ bloodGroup, district }) {
  return DONORS.filter((d) => {
    const groupMatch = !bloodGroup || d.bloodGroup === bloodGroup;
    const districtMatch = !district || d.district === district;
    return groupMatch && districtMatch;
  }).sort((a, b) => Number(b.available) - Number(a.available));
}

export function daysSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
