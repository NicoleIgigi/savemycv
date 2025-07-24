'use client'

import { useRef } from 'react'
import { Download, FileText } from 'lucide-react'
import Resume from './Resume'

const ResumeDownload = () => {
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (resumeRef.current) {
      const element = resumeRef.current
      const printWindow = window.open('', '_blank')
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Nicole Igiraneza Ishimwe - Resume</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #000;
                  background: #fff;
                  margin: 0;
                  padding: 20px;
                }
                .resume-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: #fff;
                  padding: 40px;
                  font-size: 14px;
                  line-height: 1.5;
                }
                h1 {
                  font-size: 28px;
                  margin-bottom: 8px;
                  text-align: center;
                }
                h2 {
                  font-size: 18px;
                  margin-bottom: 12px;
                  border-bottom: 2px solid #ccc;
                  padding-bottom: 4px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                }
                h3 {
                  font-size: 14px;
                  margin-bottom: 4px;
                }
                p {
                  margin-bottom: 8px;
                  text-align: justify;
                }
                ul {
                  margin-left: 24px;
                  margin-bottom: 8px;
                }
                li {
                  margin-bottom: 4px;
                }
                section {
                  margin-bottom: 24px;
                }
                .header {
                  text-center;
                  margin-bottom: 32px;
                }
                .contact-info {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 16px;
                  font-size: 12px;
                }
                .contact-item {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }
                .grid-2 {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 16px;
                }
                .grid-3 {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr;
                  gap: 16px;
                }
                .experience-item, .education-item {
                  margin-bottom: 16px;
                }
                .experience-header, .education-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: start;
                  margin-bottom: 4px;
                }
                .subtitle {
                  color: #666;
                  font-size: 12px;
                }
                .text-gray {
                  color: #666;
                }
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  .resume-container {
                    padding: 20px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="resume-container">
                ${element.innerHTML}
              </div>
            </body>
          </html>
        `)
        
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        className="btn-primary inline-flex items-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Download Resume</span>
      </button>
      
      {/* Hidden Resume Component for Print */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <Resume ref={resumeRef} />
      </div>
    </div>
  )
}

export default ResumeDownload 