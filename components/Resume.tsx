'use client'

import { forwardRef } from 'react'
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Award, GraduationCap, Briefcase } from 'lucide-react'

const Resume = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="bg-white text-black p-8 max-w-4xl mx-auto font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Nicole Igiraneza Ishimwe</h1>
        <p className="text-lg text-gray-600 mb-4">ML/AI Engineer | Graduate Research Assistant | Mastercard Foundation Scholar</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>nii@alumni.cmu.edu</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>+250785262657</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Kigali, Rwanda</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            <span>linkedin.com/in/nicole-igiraneza-ishimwe</span>
          </div>
          <div className="flex items-center gap-1">
            <Github className="w-4 h-4" />
            <span>github.com/NicoleIgigi</span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Professional Summary</h2>
        <p className="text-justify">
          Passionate Machine Learning Engineer and Data Scientist with expertise in healthcare AI, speech recognition, and autonomous systems. 
          Currently pursuing Master's degree in Information Technology at Carnegie Mellon University Africa as a Mastercard Foundation Scholar (GPA: 3.75). 
          Experienced in conducting research on safety-critical systems, training programming students, and developing ML solutions for real-world problems 
          in African contexts. Proven track record in project management, data analytics, and community leadership.
        </p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Master of Science in Information Technology</h3>
              <span className="text-gray-600">2023 - 2025</span>
            </div>
            <p className="text-gray-700">Carnegie Mellon University Africa, Kigali, Rwanda</p>
            <p className="text-sm text-gray-600">GPA: 3.75 | Mastercard Foundation Scholar</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Graduate Research Assistant on VigiMobile and KinyarMedASR projects</li>
              <li>Specialization in Machine Learning and Healthcare AI</li>
            </ul>
          </div>
          
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Bachelor's Degree in Information Technology</h3>
              <span className="text-gray-600">2018 - 2023</span>
            </div>
            <p className="text-gray-700">Adventist University of Central Africa, Rwanda</p>
            <p className="text-sm text-gray-600">GPA: 3.8 | Graduated with High Distinction</p>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Professional Experience
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Perception Annotator</h3>
              <span className="text-gray-600">Apr 2025 - Present</span>
            </div>
            <p className="text-gray-700">Zipline, Rwanda</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Review and annotate sensor data for machine learning applications supporting safety-critical systems</li>
              <li>Use specialized internal tools to label complex datasets for aircraft collision avoidance systems</li>
              <li>Identify patterns, outliers, and system problems to improve labeling processes</li>
              <li>Support autonomous delivery drone perception systems</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Graduate Research Assistant</h3>
              <span className="text-gray-600">Aug 2024 - Present</span>
            </div>
            <p className="text-gray-700">Carnegie Mellon University Africa, Kigali, Rwanda</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Conducting research on VigiMobile project for AEFI reporting using supervised learning algorithms</li>
              <li>Collaborating with Rwanda Food and Drugs Authority and healthcare providers</li>
              <li>Implementing ensemble methods for adverse effects prediction in healthcare systems</li>
              <li>Preparing research documentation and presentations for academic conferences</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Data Analyst & Machine Learning Intern</h3>
              <span className="text-gray-600">May 2024 - Aug 2024</span>
            </div>
            <p className="text-gray-700">iGiTREE, Kigali, Rwanda</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Managed projects involving data analysis and machine learning for genetic genealogy</li>
              <li>Enhanced user experience through predictive modeling and data analytics</li>
              <li>Collaborated with cybersecurity and big data specialists</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">Junior Python - Django Trainer</h3>
              <span className="text-gray-600">Feb 2023 - Mar 2024</span>
            </div>
            <p className="text-gray-700">SOLVIT AFRICA, Rwanda</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Trained 35 participants in Python Django framework over 15-week periods</li>
              <li>Provided personalized support to 70+ participants</li>
              <li>Awarded "Best Trainer" for Cohort 5 (Feb-July 2023)</li>
              <li>Developed comprehensive training materials and practical coding exercises</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Key Research Projects</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold">KinyarMedASR: Kinyarwanda Medical Speech Recognition</h3>
            <p className="text-sm text-gray-600">Sep 2024 - Dec 2024 | Carnegie Mellon University</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Reduced Word Error Rate from 31.36% to 24.34% using transformer-based spell correction</li>
              <li>Developed specialized medical dataset for Kinyarwanda speech recognition</li>
              <li>Addressed healthcare documentation challenges in African contexts</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">VigiMobile: AEFI Reporting System</h3>
            <p className="text-sm text-gray-600">Aug 2024 - Present | Carnegie Mellon University</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Implementing supervised learning algorithms for adverse effects prediction</li>
              <li>Collaborating with Rwanda FDA to improve healthcare monitoring systems</li>
              <li>Processing and analyzing healthcare data for ML applications</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Twitter Security Analysis in Rwanda</h3>
            <p className="text-sm text-gray-600">Jan 2024 - May 2024 | Carnegie Mellon University</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Analyzed security data using natural language processing and geospatial analysis</li>
              <li>Created visualization tools mapping security sentiment across Rwanda</li>
              <li>Produced actionable insights for improved security measures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Technical Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Programming Languages</h3>
            <p className="text-sm">Python, R, SQL, JavaScript, Java</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Machine Learning</h3>
            <p className="text-sm">Deep Learning, Neural Networks, Computer Vision, NLP</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Frameworks & Tools</h3>
            <p className="text-sm">Django, TensorFlow, PyTorch, Scikit-learn, Pandas</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data & Analytics</h3>
            <p className="text-sm">Data Visualization, Statistical Analysis, Big Data</p>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Languages</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Kinyarwanda:</span> Native
          </div>
          <div>
            <span className="font-semibold">English:</span> Fluent
          </div>
          <div>
            <span className="font-semibold">French:</span> Conversational
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Key Certifications
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>• Google Data Analytics Professional Certificate</div>
          <div>• Google Business Intelligence Professional Certificate</div>
          <div>• Business Analytics Professional Certificate (UPenn)</div>
          <div>• Strategic Leadership and Management (UIUC)</div>
          <div>• Python/Django Developer (SOLVIT AFRICA)</div>
          <div>• IT Security: Defense against Digital Dark Arts</div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Awards & Recognition</h2>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Mastercard Foundation Scholar</strong> - Carnegie Mellon University Africa (2023)</li>
          <li>• <strong>Best Trainer Award</strong> - SOLVIT AFRICA Cohort 5 (2023)</li>
          <li>• <strong>High Distinction Graduate</strong> - Adventist University of Central Africa (2023)</li>
          <li>• <strong>Research Contributor</strong> - Healthcare AI and Speech Recognition Projects</li>
        </ul>
      </section>
    </div>
  )
})

Resume.displayName = 'Resume'

export default Resume 