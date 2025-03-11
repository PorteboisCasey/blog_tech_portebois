import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Code2, Network, Brain, GraduationCap } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "À Propos",
      intro: "Étudiant en L3 Informatique au CNAM Paris",
      description: "Passionné par l'informatique et les nouvelles technologies, je suis actuellement en licence d'informatique générale au CNAM de Paris. Mon parcours m'a permis d'explorer différents aspects de l'informatique, du développement aux systèmes Linux en passant par les réseaux.",
      skills: {
        title: "Compétences & Intérêts",
        items: [
          {
            icon: <Terminal className="w-6 h-6" />,
            title: "Linux & Systèmes",
            desc: "Administration système, scripting, virtualisation"
          },
          {
            icon: <Code2 className="w-6 h-6" />,
            title: "Développement",
            desc: "Web, applications, programmation système"
          },
          {
            icon: <Network className="w-6 h-6" />,
            title: "Réseaux",
            desc: "Protocoles, sécurité, architecture"
          },
          {
            icon: <Brain className="w-6 h-6" />,
            title: "Intelligence Artificielle",
            desc: "Intégration IA, automatisation, innovation"
          }
        ]
      },
      future: {
        title: "Objectifs",
        content: "Je prévois de poursuivre mes études en Master (Bac+5) pour approfondir mes connaissances et me spécialiser davantage dans le développement et l'IA. Je suis particulièrement intéressé par l'utilisation innovante de l'IA dans le développement de solutions modernes."
      }
    },
    en: {
      title: "About",
      intro: "Computer Science Student at CNAM Paris",
      description: "Passionate about computer science and new technologies, I'm currently pursuing a Bachelor's degree in Computer Science at CNAM Paris. My journey has allowed me to explore various aspects of computing, from development to Linux systems and networking.",
      skills: {
        title: "Skills & Interests",
        items: [
          {
            icon: <Terminal className="w-6 h-6" />,
            title: "Linux & Systems",
            desc: "System administration, scripting, virtualization"
          },
          {
            icon: <Code2 className="w-6 h-6" />,
            title: "Development",
            desc: "Web, applications, system programming"
          },
          {
            icon: <Network className="w-6 h-6" />,
            title: "Networks",
            desc: "Protocols, security, architecture"
          },
          {
            icon: <Brain className="w-6 h-6" />,
            title: "Artificial Intelligence",
            desc: "AI integration, automation, innovation"
          }
        ]
      },
      future: {
        title: "Goals",
        content: "I plan to continue my studies with a Master's degree to deepen my knowledge and further specialize in development and AI. I'm particularly interested in the innovative use of AI in developing modern solutions."
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-club-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-display mb-4 text-club-black dark:text-club-text">
            {currentContent.title}
          </h1>
          <h2 className="text-2xl font-display mb-8 text-club-neon">
            {currentContent.intro}
          </h2>
          <p className="text-lg text-club-smoke dark:text-club-text/70 mb-12">
            {currentContent.description}
          </p>

          <h3 className="text-2xl font-display mb-8 text-club-black dark:text-club-text">
            {currentContent.skills.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {currentContent.skills.items.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-club-concrete dark:border-club-dark rounded-lg hover:border-club-neon transition-all duration-300"
              >
                <div className="flex items-center mb-4 text-club-neon">
                  {skill.icon}
                  <h4 className="ml-3 font-display text-xl text-club-black dark:text-club-text">
                    {skill.title}
                  </h4>
                </div>
                <p className="text-club-smoke dark:text-club-text/70">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-32">
            <h3 className="text-2xl font-display mb-8 text-club-black dark:text-club-text flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-club-neon" />
              {currentContent.future.title}
            </h3>
            <p className="text-lg text-club-smoke dark:text-club-text/70 leading-relaxed">
              {currentContent.future.content}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
