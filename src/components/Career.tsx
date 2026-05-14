import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Science (BSc)</h4>
                <h5>German University in Cairo (GUC)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Media Engineering and Technology. Major: Computer Science and Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IT Intern (ABAP Developer)</h4>
                <h5>Mansour Group</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed and debugged custom ABAP reports and data dictionary objects within the SAP ERP environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine & Deep Learning Intern</h4>
                <h5>Ulm University</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Optimized CNN architectures using PyTorch and presented technical evaluation metrics to research teams. Automated data preprocessing with Python, reducing manual preparation time by 40%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor’s Thesis</h4>
                <h5>Ulm University</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed and defended a research project in Machine and Deep Learning, focused on recognizing American Sign Language hand gestures using CNN models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
