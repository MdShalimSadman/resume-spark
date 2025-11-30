
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import MailIconPDF from "../icons/MailIconPDF";
import PhoneIconPDF from "../icons/PhoneIconPDF";
import MapPinIconPDF from "../icons/MapPinIconPDF";
import GlobeIconPDF from "../icons/GlobeIconPDF";

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface ResumeData {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica", 
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomStyle: "solid",
    borderBottomWidth: 4,
    borderBottomColor: "#4f46e5", 
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937", 
  },
  position: {
    fontSize: 16,
    color: "#4f46e5", 
    marginTop: 2,
  },
  contentRow: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    width: "30%",
    paddingRight: 10,
  },
  rightColumn: {
    width: "70%",
    paddingLeft: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#4f46e5",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  contactText: {
    marginLeft: 5,
    color: "#374151",
  },
  summary: {
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
  // Experience/Education Item
  itemContainer: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
  },
  itemSubtitle: {
    fontSize: 9,
    color: "#4f46e5",
    fontWeight: "semibold",
    marginTop: 1,
  },
  itemMeta: {
    fontSize: 8,
    color: "#4b5563",
    marginTop: 1,
  },
  itemDescription: {
    fontSize: 9,
    marginTop: 5,
    lineHeight: 1.5,
    color: "#374151",
  },
  // Skills
  skillItem: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 9,
    fontWeight: "semibold",
    color: "#1f2937",
  },
  skillLevel: {
    fontSize: 8,
    color: "#4b5563",
  },
});

interface ResumeDocumentProps {
  resume: ResumeData;
}


const Contact = ({ resume }: { resume: ResumeData }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.sectionHeader}>CONTACT</Text>
    <View style={styles.contactItem}>
        <MailIconPDF size={10} color="#4f39f6"/>
  
      <Text style={styles.contactText}>{resume.email}</Text>
    </View>
    <View style={styles.contactItem}>
        <PhoneIconPDF size={10} color="#4f39f6"/>

      <Text style={styles.contactText}>{resume.phone}</Text>
    </View>
    <View style={styles.contactItem}>

        <MapPinIconPDF size={10} color="#4f39f6"/>
    
      <Text style={styles.contactText}>{resume.location}</Text>
    </View>
    {resume.portfolio && (
      <View style={styles.contactItem}>
    
          <GlobeIconPDF size={10} color="#4f39f6"/>
      
        <Text style={styles.contactText}>{resume.portfolio}</Text>
      </View>
    )}
  </View>
);

const Skills = ({ skills }: { skills: Skill[] }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.sectionHeader}>SKILLS</Text>
    {skills.map((skill) => (
      <View key={skill.id} style={styles.skillItem}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <Text style={styles.skillLevel}>{skill.level}</Text>
      </View>
    ))}
  </View>
);

const Summary = ({ summary }: { summary: string }) =>
  summary ? (
    <View style={styles.summary}>
      <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.summaryText}>{summary}</Text>
    </View>
  ) : null;

const ExperienceItem = ({ exp }: { exp: Experience }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{exp.company}</Text>
    <Text style={styles.itemSubtitle}>{exp.title}</Text>
    <Text style={styles.itemMeta}>
      {exp.location} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
    </Text>
    <Text style={styles.itemDescription}>{exp.description}</Text>
  </View>
);

const Experience = ({ experiences }: { experiences: Experience[] }) =>
  experiences.length > 0 ? (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.sectionHeader}>WORK EXPERIENCE</Text>
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} exp={exp} />
      ))}
    </View>
  ) : null;

const EducationItem = ({ edu }: { edu: Education }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>
      {edu.degree}
      {edu.field && ` in ${edu.field}`}
    </Text>
    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
    <Text style={styles.itemMeta}>
      {edu.location} | {edu.startDate} - {edu.current ? "Present" : edu.endDate}
    </Text>
    {edu.description && (
      <Text style={styles.itemDescription}>{edu.description}</Text>
    )}
  </View>
);

const Education = ({ education }: { education: Education[] }) =>
  education.length > 0 ? (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.sectionHeader}>EDUCATION</Text>
      {education.map((edu) => (
        <EducationItem key={edu.id} edu={edu} />
      ))}
    </View>
  ) : null;


export const ResumeDocument = ({ resume }: ResumeDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header (Name and Position) */}
      <View style={styles.header} fixed>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.position}>{resume.position}</Text>
      </View>

      <View style={styles.contentRow}>
        {/* Left Column (Contact, Skills) */}
        <View style={styles.leftColumn}>
          <Contact resume={resume} />
          <Skills skills={resume.skills} />
        </View>

        {/* Right Column (Summary, Experience, Education) */}
        <View style={styles.rightColumn}>
          <Summary summary={resume.summary} />
          <Experience experiences={resume.experiences} />
          <Education education={resume.education} />
        </View>
      </View>
    </Page>
  </Document>
);