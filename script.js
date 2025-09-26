// Translation data
const translations = {
    en: {
        dashboard_title: "Health Monitoring Dashboard",
        dashboard_subtitle: "Smart surveillance system for water-borne diseases in Rural Northeast India",
        total_reports: "Total Reports Today",
        active_alerts: "AI Outbreak Predictions",
        water_sources: "Monitored Water Sources",
        asha_workers: "Active ASHA Workers",
        outbreak_trends: "Disease Outbreak Trends",
        risk_map: "Northeast India Risk Hotspot Map",
        report_title: "Community Health Reporting",
        report_subtitle: "Report health incidents via ASHA workers, volunteers, and community members",
        personal_info: "Personal Information",
        reporter_type: "Reporter Type",
        name: "Name",
        phone: "Phone Number",
        location: "Location/Village",
        report_type: "Report Type",
        symptoms: "Symptoms & Health Information",
        affected_count: "Number of People Affected",
        suspected_source: "Suspected Water Source",
        diarrhea: "Diarrhea",
        vomiting: "Vomiting",
        fever: "Fever",
        abdominal_pain: "Abdominal Pain",
        dehydration: "Dehydration",
        nausea: "Nausea",
        headache: "Headache",
        weakness: "Weakness/Fatigue",
        additional_info: "Additional Information",
        severity: "Severity Level",
        duration: "Duration of Symptoms",
        description: "Additional Description",
        submit_report: "Submit Community Report",
        water_title: "Water Quality Monitoring",
        water_subtitle: "IoT sensors and manual testing for water source contamination monitoring",
        manual_testing: "Manual Water Testing (Low-cost Test Kits)",
        education_title: "Health Education & Prevention",
        education_subtitle: "Learn about water-borne diseases and prevention methods",
        water_safety: "Water Safety",
        hygiene: "Hygiene Practices",
        symptoms_guide: "Symptom Recognition",
        monsoon_prep: "Monsoon Preparation", 
        mobile_reporting: "Mobile Reporting",
        ai_predictions: "AI Predictions",
        video_tutorials: "Video Tutorials",
        alerts_title: "Health Alerts & Notifications",
        alerts_subtitle: "Current health alerts and early warning notifications",
        prediction_title: "AI/ML Outbreak Prediction Engine",
        prediction_subtitle: "Machine learning models analyzing health data, water quality, and seasonal patterns"
    },
    as: {
        dashboard_title: "স্বাস্থ্য মনিটৰিং ড্যাশব'ৰ্ড",
        dashboard_subtitle: "উত্তৰ-পূৰ্ব ভাৰতত পানীবাহিত ৰোগৰ বাবে বাস্তৱ সময়ৰ নিৰীক্ষণ",
        total_reports: "আজিৰ মুঠ প্ৰতিবেদন",
        active_alerts: "AI প্ৰাদুৰ্ভাৱ পূৰ্বাভাস",
        water_sources: "নিৰীক্ষিত পানীৰ উৎস",
        asha_workers: "সক্ৰিয় আশা কৰ্মী",
        outbreak_trends: "ৰোগ প্ৰাদুৰ্ভাৱৰ ধাৰা",
        risk_map: "বিপদৰ হটস্পট মেপ",
        report_title: "সম্প্ৰদায়িক স্বাস্থ্য প্ৰতিবেদন",
        report_subtitle: "আপোনাৰ সম্প্ৰদায়ত স্বাস্থ্য সমস্যা আৰু লক্ষণসমূহ প্ৰতিবেদন কৰক"
    },
    bn: {
        dashboard_title: "স্বাস্থ্য মনিটরিং ড্যাশবোর্ড",
        dashboard_subtitle: "উত্তর-পূর্ব ভারতে পানিবাহিত রোগের জন্য রিয়েল-টাইম নিরীক্ষণ",
        total_reports: "আজকের মোট রিপোর্ট",
        active_alerts: "AI প্রাদুর্ভাব পূর্বাভাস",
        water_sources: "নিরীক্ষিত পানির উৎস",
        asha_workers: "সক্রিয় আশা কর্মী"
    },
    hi: {
        dashboard_title: "स्वास्थ्य मॉनिटरिंग डैशबोर्ड",
        dashboard_subtitle: "उत्तर-पूर्व भारत में पानी से होने वाली बीमारियों की वास्तविक समय निगरानी",
        total_reports: "आज की कुल रिपोर्ट",
        active_alerts: "AI प्रकोप पूर्वानुमान",
        water_sources: "निगरानी किए गए पानी के स्रोत",
        asha_workers: "सक्रिय आशा कार्यकर्ता"
    }
};

// Global variables
let currentLanguage = 'en';
let outbreakChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageSelector();
    initializeForms();
    initializeChart();
    initializeModals();
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        document.getElementById('languageSelect').value = savedLanguage;
        updateLanguage();
    }
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Close alert banner
    const alertClose = document.querySelector('.alert-close');
    if (alertClose) {
        alertClose.addEventListener('click', function() {
            this.closest('.alert-banner').style.display = 'none';
        });
    }
}

// Language selector functionality
function initializeLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updateLanguage();
    });
}

// Update language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    const currentTranslations = translations[currentLanguage] || translations.en;
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });
}

// Form handling
function initializeForms() {
    const healthReportForm = document.getElementById('healthReportForm');
    const waterTestForm = document.getElementById('waterTestForm');
    
    if (healthReportForm) {
        healthReportForm.addEventListener('submit', handleHealthReport);
    }
    
    if (waterTestForm) {
        waterTestForm.addEventListener('submit', handleWaterTest);
    }
    
    // Alert subscription form
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', handleSubscription);
    }
}

// Handle health report submission
function handleHealthReport(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reportData = {
        reporterName: formData.get('reporterName'),
        reporterType: formData.get('reporterType'),
        reporterPhone: formData.get('reporterPhone'),
        location: formData.get('location'),
        reportType: formData.get('reportType'),
        symptoms: formData.getAll('symptoms'),
        affectedCount: formData.get('affectedCount'),
        severity: formData.get('severity'),
        duration: formData.get('duration'),
        description: formData.get('description'),
        waterSource: formData.get('waterSource'),
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    const reports = JSON.parse(localStorage.getItem('healthReports') || '[]');
    reports.push(reportData);
    localStorage.setItem('healthReports', JSON.stringify(reports));
    
    // Show success message
    showSuccessMessage('Community health report submitted successfully! Authorities have been notified.');
    
    // Reset form
    e.target.reset();
    
    // Update metrics (demo)
    updateDashboardMetrics();
}

// Handle water test submission
function handleWaterTest(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const testData = {
        sourceName: formData.get('sourceName'),
        pH: formData.get('pH'),
        turbidity: formData.get('turbidity'),
        bacteria: formData.get('bacteria'),
        testKit: formData.get('testKit'),
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage
    const waterTests = JSON.parse(localStorage.getItem('waterTests') || '[]');
    waterTests.push(testData);
    localStorage.setItem('waterTests', JSON.stringify(waterTests));
    
    showSuccessMessage('Water test results submitted successfully! Data added to monitoring system.');
    e.target.reset();
}

// Handle alert subscription
function handleSubscription(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const subscriptionData = {
        phone: formData.get('phone'),
        method: formData.get('method'),
        timestamp: new Date().toISOString()
    };
    
    // Store subscription
    localStorage.setItem('alertSubscription', JSON.stringify(subscriptionData));
    
    showSuccessMessage('Successfully subscribed to AI predictions and health alerts!');
    e.target.reset();
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    successText.textContent = message;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Initialize chart
function initializeChart() {
    const canvas = document.getElementById('outbreakChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Simple chart drawing
    drawOutbreakChart(ctx, canvas.width, canvas.height);
}

// Draw outbreak trends chart
function drawOutbreakChart(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    
    // Sample data for monsoon season water-borne diseases
    const data = [8, 12, 18, 25, 35, 45, 52, 48, 38, 28, 15, 10];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const maxValue = Math.max(...data);
    
    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw data line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#2563eb';
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        const y = height - padding - (value / maxValue) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Add labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        ctx.fillText(label, x, height - 10);
    });
}

// Modal functionality
function initializeModals() {
    const modal = document.getElementById('educationModal');
    const closeModal = document.querySelector('.modal-close');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Open education modal
function openEducationModal(topic) {
    const modal = document.getElementById('educationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const content = getEducationContent(topic);
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    
    modal.style.display = 'block';
}

// Get education content
function getEducationContent(topic) {
    const content = {
        'water-safety': {
            title: 'Water Safety Guidelines',
            body: `
                <h3>Safe Drinking Water Practices</h3>
                <ul>
                    <li><strong>Boil water:</strong> Boil drinking water for at least 1 minute to kill harmful bacteria and viruses</li>
                    <li><strong>Use water purification tablets:</strong> Follow package instructions for proper dosage</li>
                    <li><strong>Store water safely:</strong> Keep purified water in clean, covered containers</li>
                    <li><strong>Avoid contaminated sources:</strong> Don't use water from rivers, ponds, or wells without treatment</li>
                </ul>
                <h3>Water Storage Tips</h3>
                <ul>
                    <li>Clean water containers regularly with soap and bleach</li>
                    <li>Cover water containers to prevent contamination</li>
                    <li>Use water within 24 hours of purification</li>
                    <li>Keep storage containers away from toilets and garbage</li>
                </ul>
            `
        },
        'mobile-reporting': {
            title: 'Mobile Health Reporting System',
            body: `
                <h3>For ASHA Workers</h3>
                <ul>
                    <li>Use mobile app to report cases immediately</li>
                    <li>Take photos of symptoms (with patient consent)</li>
                    <li>GPS location automatically recorded</li>
                    <li>Offline mode available for remote areas</li>
                </ul>
                <h3>For Community Volunteers</h3>
                <ul>
                    <li>Simple SMS reporting system available</li>
                    <li>WhatsApp integration for quick alerts</li>
                    <li>Voice messages in local languages</li>
                    <li>Community group notifications</li>
                </ul>
                <h3>Data Privacy & Security</h3>
                <ul>
                    <li>All patient data encrypted</li>
                    <li>Anonymous reporting options available</li>
                    <li>Secure transmission to health authorities</li>
                    <li>GDPR compliant data handling</li>
                </ul>
            `
        },
        'ai-predictions': {
            title: 'AI-Powered Outbreak Prediction',
            body: `
                <h3>How AI Helps Your Community</h3>
                <ul>
                    <li>Analyzes patterns from multiple data sources</li>
                    <li>Predicts outbreaks 2-7 days in advance</li>
                    <li>Identifies high-risk areas automatically</li>
                    <li>Sends early warnings to health workers</li>
                </ul>
                <h3>Data Sources Used</h3>
                <ul>
                    <li>Community health reports</li>
                    <li>Water quality sensor data</li>
                    <li>Weather and rainfall patterns</li>
                    <li>Historical outbreak data</li>
                    <li>Population movement patterns</li>
                </ul>
                <h3>Benefits for Communities</h3>
                <ul>
                    <li>Earlier intervention saves lives</li>
                    <li>Better resource allocation</li>
                    <li>Reduced healthcare costs</li>
                    <li>Improved community preparedness</li>
                </ul>
            `
        },
        'hygiene': {
            title: 'Hygiene Practices',
            body: `
                <h3>Hand Hygiene</h3>
                <ul>
                    <li>Wash hands with soap and water for at least 20 seconds</li>
                    <li>Wash hands before eating, after using toilet, and after handling waste</li>
                    <li>Use alcohol-based hand sanitizer when soap is not available</li>
                </ul>
                <h3>Food Safety</h3>
                <ul>
                    <li>Cook food thoroughly and eat while hot</li>
                    <li>Avoid raw or undercooked food</li>
                    <li>Peel fruits yourself</li>
                    <li>Avoid street vendor food during outbreaks</li>
                </ul>
                <h3>Personal Hygiene</h3>
                <ul>
                    <li>Bathe regularly with clean water and soap</li>
                    <li>Keep fingernails short and clean</li>
                    <li>Wear clean clothes</li>
                    <li>Dispose of waste properly</li>
                </ul>
            `
        },
        'symptoms': {
            title: 'Recognizing Water-borne Disease Symptoms',
            body: `
                <h3>Common Symptoms</h3>
                <div class="symptom-category">
                    <h4>Diarrheal Diseases (Cholera, E.coli)</h4>
                    <ul>
                        <li>Frequent watery stools</li>
                        <li>Severe dehydration</li>
                        <li>Vomiting</li>
                        <li>Abdominal cramps</li>
                    </ul>
                </div>
                <div class="symptom-category">
                    <h4>Typhoid Fever</h4>
                    <ul>
                        <li>High fever (104°F/40°C)</li>
                        <li>Severe headache</li>
                        <li>Abdominal pain</li>
                        <li>Rose-colored spots on torso</li>
                    </ul>
                </div>
                <h3>When to Seek Medical Help</h3>
                <ul>
                    <li><strong>Immediate:</strong> Severe dehydration, high fever, blood in stool</li>
                    <li><strong>Within 24 hours:</strong> Persistent vomiting, inability to keep fluids down</li>
                    <li><strong>For children:</strong> Any symptoms in infants under 6 months</li>
                </ul>
            `
        },
        'monsoon': {
            title: 'Monsoon Health Preparedness',
            body: `
                <h3>Pre-Monsoon Preparation</h3>
                <ul>
                    <li>Stock up on water purification tablets</li>
                    <li>Repair and clean water storage tanks</li>
                    <li>Check drainage systems around your home</li>
                    <li>Prepare emergency medical supplies</li>
                </ul>
                <h3>During Monsoon</h3>
                <ul>
                    <li>Avoid walking through flood water</li>
                    <li>Increase water treatment vigilance</li>
                    <li>Report contaminated water sources immediately</li>
                    <li>Monitor family health closely</li>
                </ul>
                <h3>Special Precautions</h3>
                <ul>
                    <li>Pregnant women and elderly need extra care</li>
                    <li>Children should avoid playing in stagnant water</li>
                    <li>Maintain higher hygiene standards</li>
                    <li>Keep emergency contact numbers handy</li>
                </ul>
            `
        }
    };
    
    return content[topic] || {
        title: 'Information',
        body: '<p>Content not available.</p>'
    };
}

// Update dashboard metrics (demo function)
function updateDashboardMetrics() {
    const reports = JSON.parse(localStorage.getItem('healthReports') || '[]');
    const todayReports = reports.filter(report => {
        const reportDate = new Date(report.timestamp).toDateString();
        const today = new Date().toDateString();
        return reportDate === today;
    });
    
    // Update the metric display
    const totalReportsElement = document.querySelector('.metric-card:first-child .metric-content h3');
    if (totalReportsElement) {
        totalReportsElement.textContent = todayReports.length.toLocaleString();
    }
}

// Add source modal (placeholder function)
function openAddSourceModal() {
    alert('Add New Water Source: Deploy IoT sensors or register manual testing locations. Contact your district health officer for sensor deployment.');
}

// Offline functionality
window.addEventListener('online', function() {
    showSuccessMessage('Connection restored. Data will be synchronized.');
});

window.addEventListener('offline', function() {
    showSuccessMessage('You are offline. Data will be saved locally.');
});

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}