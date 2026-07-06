// Dummy data for the Admin Dashboard.
// Replace these exports with Axios API calls once the backend is ready.
// Example future usage:
//   const { data } = await axios.get("/api/admin/stats");
//   const { data } = await axios.get("/api/admin/reports");

export const stats = [
  { id: "total-users", title: "Total Users", value: 482 },
  { id: "lost-posts", title: "Lost Posts", value: 137 },
  { id: "found-posts", title: "Found Posts", value: 96 },
  { id: "recovered-items", title: "Recovered Items", value: 54 },
];

export const reports = [
  {
    id: 1,
    item: "Wallet",
    type: "Lost",
    user: "Ariana Fernandes",
    status: "Pending",
  },
  {
    id: 2,
    item: "Calculator",
    type: "Found",
    user: "Rohit Malhotra",
    status: "Recovered",
  },
  {
    id: 3,
    item: "ID Card",
    type: "Lost",
    user: "Sneha Kapoor",
    status: "Pending",
  },
  {
    id: 4,
    item: "Laptop Charger",
    type: "Found",
    user: "Devansh Patel",
    status: "Claimed",
  },
  {
    id: 5,
    item: "Water Bottle",
    type: "Lost",
    user: "Meera Iyer",
    status: "Pending",
  },
  {
    id: 6,
    item: "Wallet",
    type: "Found",
    user: "Kabir Sharma",
    status: "Recovered",
  },
  {
    id: 7,
    item: "ID Card",
    type: "Found",
    user: "Priya Nair",
    status: "Claimed",
  },
  {
    id: 8,
    item: "Calculator",
    type: "Lost",
    user: "Aditya Rao",
    status: "Pending",
  },
  {
    id: 9,
    item: "Laptop Charger",
    type: "Lost",
    user: "Isha Verma",
    status: "Pending",
  },
  {
    id: 10,
    item: "Water Bottle",
    type: "Found",
    user: "Nikhil Joshi",
    status: "Recovered",
  },
];