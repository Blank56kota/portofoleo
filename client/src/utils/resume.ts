// Resume download utility
export const downloadResume = () => {
  // Create resume content as PDF or text
  const resumeContent = `
SANDEEP KOTA
Angular Developer | Front-End Development | Scalable Solutions

CONTACT INFORMATION
Phone: +91-8488063630
Email: kotasandeep504@gmail.com
LinkedIn: linkedin.com
Location: Hyderabad, India

SUMMARY
With over 3 years of experience, I am passionate about delivering scalable and performant Angular & React solutions. 
My expertise with TypeScript, Node.js, and cloud integration has driven significant efficiency improvements—recently 
contributing to an 85% project productivity boost, including an award-winning platform delivery. I'm eager to leverage 
these skills as an Angular/React Architect to help organizations elevate their technical offerings.

SKILLS
Technologies/Frameworks: Angular, React, React-Native, NextJs, Node.js, HTML5, CSS3, SCSS
Languages: TypeScript, JavaScript
Libraries/Tools: RxJS, RESTful APIs, MongoDB, Git, CI/CD, Razorpay, Stripe Integration

EXPERIENCE
Angular Developer / React Developer
UXDESIGNLABS TECHNOLOGIES LLP | Nallakunta, Hyderabad
03/2023 - Present

Key Achievements:
• Designed a modular Angular/React architecture that increased performance efficiency by 35%, enhancing user experience
• Led a team of 10 developers to successfully deliver an enterprise-level web application within a 12-month deadline
• Managed Angular/React upgrade projects that reduced technical debt by 25% and improved the maintainability of critical codebases
• Implemented CI/CD for the Angular/React projects, which halved deployment times and reduced manual testing requirements
• Collaborated with cross-functional product teams to accurately translate business goals into scalable front-end solutions
• Played a pivotal role in transforming a legacy system to Angular/React, achieving a 40% reduction in customer complaints

Key Achievement: Backend Developer Role
Joined as Front-end developer and transitioned into Backend developer with Node.js and MongoDB

EDUCATION
B.Sc Bio-technology
Sri Sai Triveeni Degree and Pg Colleges | Suryapet, Telangana
06/2018 - 05/2022 | CGPA: 8.2

Intermediate (BI.P.C)
Noothanka, Suryapet
2016 - 2018

SSC (10th)
Gorentla, Maddirala, Suryapet
2016

INTERESTS
Front-End Development: Continuously exploring advancements in front-end technologies to deliver impactful user experiences.
Music and Streaming: Passionate about combining technology with media to innovate streaming services and foster entertainment.
  `.trim();

  // Create a blob and download
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Sandeep_Kota_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

