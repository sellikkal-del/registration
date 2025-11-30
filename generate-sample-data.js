import xlsx from 'xlsx';

// Sample attendees data
const attendeesData = [
  {
    email: 'alice@example.com',
    name: 'Alice Johnson',
    workshopOptions: 'workshop_1,workshop_2'
  },
  {
    email: 'bob@example.com',
    name: 'Bob Smith',
    workshopOptions: 'workshop_1,workshop_3'
  },
  {
    email: 'charlie@example.com',
    name: 'Charlie Brown',
    workshopOptions: 'workshop_2,workshop_3'
  },
  {
    email: 'diana@example.com',
    name: 'Diana Prince',
    workshopOptions: 'workshop_1,workshop_2,workshop_3'
  },
  {
    email: 'eve@example.com',
    name: 'Eve Davis',
    workshopOptions: 'workshop_1'
  }
];

// Sample workshops data
const workshopsData = [
  {
    id: 'workshop_1',
    name: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript from scratch',
    capacity: 30
  },
  {
    id: 'workshop_2',
    name: 'Data Science with Python',
    description: 'Introduction to Python, Pandas, and Machine Learning',
    capacity: 25
  },
  {
    id: 'workshop_3',
    name: 'UI/UX Design Principles',
    description: 'Learn design thinking and Figma basics',
    capacity: 20
  }
];

// Create workbook
const wb = xlsx.utils.book_new();

// Create Attendees sheet
const attendeesSheet = xlsx.utils.json_to_sheet(attendeesData);
xlsx.utils.book_append_sheet(wb, attendeesSheet, 'Attendees');

// Create Workshops sheet
const workshopsSheet = xlsx.utils.json_to_sheet(workshopsData);
xlsx.utils.book_append_sheet(wb, workshopsSheet, 'Workshops');

// Write file
xlsx.writeFile(wb, 'sample-workshop-data.xlsx');

console.log('Sample Excel file created: sample-workshop-data.xlsx');
console.log('\nFile contains:');
console.log(`- ${attendeesData.length} attendees`);
console.log(`- ${workshopsData.length} workshops`);
console.log('\nYou can now import this file in the admin panel.');
