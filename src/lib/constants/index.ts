export const adminNavItems = (adminId: string) => [
  {
    name: "Dashboard",
    icon: "/assets/images/menu.png",
    url: `/admin/${adminId}/dashboard`,
  },
  {
    name: "Notification",
    icon: "/assets/images/notification.png",
    url: `/admin/${adminId}/result-notification`,
  },
  {
    name: "Assign Advisors",
    icon: "/assets/images/bar-chart.png",
    url: `/admin/${adminId}/assign-advisors`,
  },
  {
    name: "Sessions & Windows",
    icon: "/assets/icons/video.svg",
    url: `/admin/${adminId}/session-windows`,
  },
  {
    name: "Broadcast Message",
    icon: "/assets/icons/others.svg",
    url: `/admin/${adminId}/broadcast-message`,
  },
  {
    name: "Upload Course",
    icon: "/assets/icons/upload.svg",
    url: `/admin/${adminId}/upload-course`,
  },
];


export const img = "/assets/images/avatar.png"

const nav = [
  {
    img: '🎓',
  },
  {
    img: '🛠',
  },
  {
    img: '👋',
  },
  {
    img: '📊',
  },
  {
    img: '📄',
  },
  {
    img: '📋',
  },
]
export const permission = [
  "student", 
  "non student",
] as const;

export const levels = [
  "100 level",
  "200 level",
  "300 level",
  "400 level",
  "500 level",
] as const;

export const editLevels = [
  "100",
  "200",
  "300",
  "400",
  "500",
] as const;

export const gender = [
  "female",
  "male",
] as const;

export const status = [
  "active",
  "inactive",
] as const;

export const futaDepartments = [
  "Agricultural Extension & Communication Technology",
  "Agricultural & Resource Economics",
  "Animal Production & Health",
  "Crop, Soil & Pest Management",
  "Fisheries & Aquaculture Technology",
  "Food Science & Technology",
  "Forestry & Wood Technology",
  "Ecotourism & Wildlife Management",
  "Agricultural Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Electrical & Electronics Engineering",
  "Industrial & Production Engineering",
  "Mechanical Engineering",
  "Metallurgical & Materials Engineering",
  "Mining Engineering",
  "Applied Geology",
  "Applied Geophysics",
  "Meteorology",
  "Marine Science & Technology",
  "Remote Sensing & Geoscience Information Systems",
  "Architecture",
  "Building",
  "Estate Management",
  "Industrial Design",
  "Quantity Surveying",
  "Surveying & Geoinformatics",
  "Urban & Regional Planning",
  "Accounting",
  "Business Administration",
  "Economics",
  "Entrepreneurship Management Technology",
  "Project Management Technology",
  "Transport Management Technology",
  "Computer Science",
  "Cyber Security",
  "Information & Communication Technology",
  "Information Systems",
  "Information Technology",
  "Software Engineering",
  "Biochemistry",
  "Biology",
  "Biotechnology",
  "Microbiology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Statistics",
  "Anatomy",
  "Biomedical Technology",
  "Physiology",
] as const; 

export const semesters = ["first semester", "second semester"] as const;

export const homeDetails = [
  {
    img: "/assets/images/recording.png",
    text: "🎓 Student Portal",
    href: "/sign-in"
  },
  {
    img: "/assets/images/laptop.png",
    text: "🛠️ Admin Portal",
    href: "/admin-auth/sign-in"
  }
]

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl ="/assets/images/avatar.png";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
