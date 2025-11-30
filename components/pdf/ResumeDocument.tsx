import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import MailIconPDF from "../icons/MailIconPDF";
import PhoneIconPDF from "../icons/PhoneIconPDF";
import MapPinIconPDF from "../icons/MapPinIconPDF";
import GlobeIconPDF from "../icons/GlobeIconPDF";
import { JSX } from "react";
import { Style } from "@react-pdf/types"; 

try {
    Font.register({
        family: 'Helvetica',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.8.3/fonts/Helvetica.ttf',
        fontWeight: 400,
        fontStyle: 'normal',
    });

    Font.register({
        family: 'Helvetica',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.8.3/fonts/Helvetica-Bold.ttf',
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Helvetica',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.8.3/fonts/Helvetica-Oblique.ttf',
        fontStyle: 'italic',
        fontWeight: 400,
    });
    
    Font.register({
        family: 'Helvetica',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.8.3/fonts/Helvetica-BoldOblique.ttf',
        fontWeight: 'bold',
        fontStyle: 'italic',
    });

} catch (e) {
}


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
  listItemContainer: {
    marginTop: 2,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 2,
    alignItems: "flex-start",
  },
  bullet: {
    width: 8,
    color: "#374151",
    fontSize: 8,
    lineHeight: 1.5,
  },
  listItemText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
  },
  underlineText: {
    textDecoration: "underline",
  },
});

type BaseTextStyle = Style & {
    fontWeight?: 'bold' | 'normal' | 400 | 'semibold' | 'ultralight' | 100 | 200 | 300 | 500 | 600 | 700 | 800 | 900;
};

const renderInlineText = (html: string, baseStyle: BaseTextStyle): JSX.Element[] => {
    const inlineTagRegex = /<\/?(strong|b|em|i|u)[^>]*>/i;
    const parts: JSX.Element[] = [];
    let currentHtml = html;
    
    while (currentHtml.length > 0) {
        const match: RegExpMatchArray | null = currentHtml.match(inlineTagRegex);

        if (!match) {
            if (currentHtml.trim().length > 0) {
                parts.push(<Text key={`text-${Math.random()}`} style={baseStyle}>{currentHtml}</Text>);
            }
            break;
        }

        const fullTag = match[0];
        const tagIndex = match.index!;
        const tagName = fullTag.replace(/<\/?([^ >]+)[^>]*>/i, '$1').toLowerCase();
        const isOpeningTag = !fullTag.startsWith('</');

        const plainText = currentHtml.substring(0, tagIndex);
        if (plainText.trim().length > 0) {
            parts.push(<Text key={`text-${Math.random()}`} style={baseStyle}>{plainText}</Text>);
        }

        if (isOpeningTag) {
            const closingTag = `</${tagName}>`;
            const closingIndex = currentHtml.indexOf(closingTag, tagIndex + fullTag.length);

            if (closingIndex !== -1) {
                const innerHtml = currentHtml.substring(tagIndex + fullTag.length, closingIndex);
                
                let newStyle: BaseTextStyle = { ...baseStyle };
                
                if (tagName === 'strong' || tagName === 'b') {
                    newStyle = { ...newStyle, fontWeight: 'bold' };
                } else if (tagName === 'em' || tagName === 'i') {
                    newStyle = { ...newStyle, fontStyle: 'italic' };
                } else if (tagName === 'u') {
                    newStyle = { ...newStyle, ...styles.underlineText };
                }

                const styledParts = renderInlineText(innerHtml, newStyle);
                parts.push(...styledParts);

                currentHtml = currentHtml.substring(closingIndex + closingTag.length);
                continue;
            }
        }
        
        currentHtml = currentHtml.substring(tagIndex + fullTag.length);
    }

    return parts;
};


interface HTMLTextToPDFProps {
    html: string;
    baseStyle: {
        fontSize: number;
        lineHeight: number;
        color: string;
    };
}

const HTMLTextToPDF = ({ html, baseStyle }: HTMLTextToPDFProps) => {
    const elements: JSX.Element[] = [];

    let processedHtml = html.replace(/<br\s*\/?>/gi, '</p><p>').replace(/<\/?span[^>]*>/gi, '');

    processedHtml = processedHtml.trim();
    if (!processedHtml.startsWith('<p') && !processedHtml.startsWith('<ul') && !processedHtml.startsWith('<ol')) {
        processedHtml = `<p>${processedHtml}</p>`;
    }

    const blocks = processedHtml.split(/(<p[^>]*>|<\/p>|<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>)/gi)
        .filter(block => block.trim().length > 0);

    let listType: 'ul' | 'ol' | null = null;
    let listItemCounter = 1;

    blocks.forEach((block, index) => {
        const trimmedBlock = block.trim();

        if (trimmedBlock.startsWith('<ul')) {
            listType = 'ul';
            elements.push(<View key={`list-container-start-${index}`} style={styles.listItemContainer} />);
            listItemCounter = 1; 

        } else if (trimmedBlock.startsWith('<ol')) {
            listType = 'ol';
            elements.push(<View key={`list-container-start-${index}`} style={styles.listItemContainer} />);
            listItemCounter = 1; 

        } else if (trimmedBlock.startsWith('</ul') || trimmedBlock.startsWith('</ol')) {
            listType = null;

        } else if (trimmedBlock.includes('<li')) {
            
            const listItems = Array.from(trimmedBlock.matchAll(/<li[^>]*>(.*?)<\/li>/gi));

            if (listItems.length > 0) {
                listItems.forEach(match => {
                    const innerHtml = match[1].trim();

                    if (innerHtml) {
                        const bulletOrNumber = listType === 'ol' ? `${listItemCounter}.` : '•';
                        
                        elements.push(
                            <View key={`list-item-${index}-${listItemCounter}`} style={styles.listItem}>
                                <Text style={styles.bullet}>{bulletOrNumber}</Text>
                                <Text style={styles.listItemText}>
                                    {renderInlineText(innerHtml, styles.listItemText)}
                                </Text>
                            </View>
                        );
                        if (listType === 'ol') {
                            listItemCounter++;
                        }
                    }
                });
            }
        } else if (!trimmedBlock.startsWith('<')) {
            const innerHtml = trimmedBlock.replace(/<\/?p[^>]*>/gi, '').trim();
            
            if (innerHtml.length > 0) {
                elements.push(
                    <View key={`text-${index}`} style={{ marginBottom: 5 }}>
                        <Text style={baseStyle}>
                            {renderInlineText(innerHtml, baseStyle)}
                        </Text>
                    </View>
                );
            }
        }
    });

    return <View>{elements}</View>;
};


interface ResumeDocumentProps {
  resume: ResumeData;
}


const Contact = ({ resume }: { resume: ResumeData }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.sectionHeader}>CONTACT</Text>
    <View style={styles.contactItem}>
      <MailIconPDF size={10} color="#4f39f6" />

      <Text style={styles.contactText}>{resume.email}</Text>
    </View>
    <View style={styles.contactItem}>
      <PhoneIconPDF size={10} color="#4f39f6" />

      <Text style={styles.contactText}>{resume.phone}</Text>
    </View>
    <View style={styles.contactItem}>

      <MapPinIconPDF size={10} color="#4f39f6" />

      <Text style={styles.contactText}>{resume.location}</Text>
    </View>
    {resume.portfolio && (
      <View style={styles.contactItem}>

        <GlobeIconPDF size={10} color="#4f39f6" />

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
      <HTMLTextToPDF html={summary} baseStyle={styles.summaryText} />
    </View>
  ) : null;

const ExperienceItem = ({ exp }: { exp: Experience }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{exp.company}</Text>
    <Text style={styles.itemSubtitle}>{exp.title}</Text>
    <Text style={styles.itemMeta}>
      {exp.location} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
    </Text>
    {exp.description && (
        <HTMLTextToPDF html={exp.description} baseStyle={styles.itemDescription} />
    )}
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
      <HTMLTextToPDF html={edu.description} baseStyle={styles.itemDescription} />
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
      <View style={styles.header} fixed>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.position}>{resume.position}</Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.leftColumn}>
          <Contact resume={resume} />
          <Skills skills={resume.skills} />
        </View>

        <View style={styles.rightColumn}>
          <Summary summary={resume.summary} />
          <Experience experiences={resume.experiences} />
          <Education education={resume.education} />
        </View>
      </View>
    </Page>
  </Document>
);