// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initUploadZone();
    initScrollAnimations();
    initContactForm();
    
    // Display welcome message
    console.log('CyberShield AI initialized successfully');
});

// Navigation Functions
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize upload zone drag and drop
function initUploadZone() {
    const uploadZone = document.getElementById('uploadZone');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    uploadZone.addEventListener('drop', handleDrop, false);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        uploadZone.classList.add('dragover');
    }
    
    function unhighlight() {
        uploadZone.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
}

// Handle file selection from input
function handleFileSelect(files) {
    handleFiles(files);
}

// Process uploaded files
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        const fileType = file.type;
        const fileName = file.name;
        
        // Show processing message
        const uploadZone = document.getElementById('uploadZone');
        uploadZone.innerHTML = `
            <div class="upload-content">
                <i class="fas fa-cog fa-spin"></i>
                <h4>Analyzing File</h4>
                <p>${fileName}</p>
                <div class="progress-bar" style="width: 100%; height: 5px; background: var(--light-gray); margin: 1rem 0; border-radius: 5px;">
                    <div class="progress" style="width: 0%; height: 100%; background: var(--primary); border-radius: 5px; animation: progress 2s ease-in-out infinite;"></div>
                </div>
            </div>
        `;
        
        // Simulate AI processing
        setTimeout(() => {
            // Random result for demo purposes
            const isSafe = Math.random() > 0.3;
            
            if (isSafe) {
                uploadZone.innerHTML = `
                    <div class="upload-content">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i>
                        <h4>File is Safe</h4>
                        <p>${fileName} has been scanned and no threats were detected.</p>
                        <button class="btn-outline" onclick="resetUploadZone()">Scan Another File</button>
                    </div>
                `;
                uploadZone.classList.add('result-safe');
            } else {
                uploadZone.innerHTML = `
                    <div class="upload-content">
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i>
                        <h4>Potential Threat Detected</h4>
                        <p>${fileName} shows suspicious patterns. We recommend not opening this file.</p>
                        <button class="btn-outline" onclick="resetUploadZone()">Scan Another File</button>
                    </div>
                `;
                uploadZone.classList.add('result-warning');
            }
        }, 2000);
    }
}

// Reset upload zone to initial state
function resetUploadZone() {
    const uploadZone = document.getElementById('uploadZone');
    uploadZone.innerHTML = `
        <div class="upload-content">
            <i class="fas fa-file-upload"></i>
            <h4>Drag & Drop Any File</h4>
            <p>URL, text, image, video, document - AI scans automatically</p>
            <button class="btn-outline" onclick="document.getElementById('fileInput').click()">
                Or Select Files
            </button>
        </div>
    `;
    uploadZone.classList.remove('result-safe', 'result-warning', 'result-danger');
}

// Initialize scroll animations
function initScrollAnimations() {
    // Simple fade-in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and tool cards
    const elementsToAnimate = document.querySelectorAll('.feature-card, .tool-card, .stat-card, .about-text, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.disabled = true;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// Phishing URL Detection
function analyzeURL() {
    const urlInput = document.getElementById('urlInput');
    const urlResult = document.getElementById('urlResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        urlResult.innerHTML = '<p style="color: var(--warning);">Please enter a URL to analyze</p>';
        return;
    }
    
    // Show loading state
    urlResult.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-cog fa-spin" style="margin-right: 10px;"></i>
            <span>Analyzing URL...</span>
        </div>
    `;
    
    // Simulate AI analysis
    setTimeout(() => {
        // For demo purposes, use a simple check for known patterns
        const isPhishing = detectPhishingURL(url);
        
        if (isPhishing) {
            urlResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="color: var(--danger); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--danger); margin-bottom: 10px;">Phishing URL Detected!</h4>
                    <p>This URL shows characteristics of a phishing attempt. Do not proceed.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        Detected patterns: Suspicious domain, misleading structure
                    </div>
                </div>
            `;
            urlResult.classList.add('result-danger');
        } else {
            urlResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="color: var(--success); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--success); margin-bottom: 10px;">URL Appears Safe</h4>
                    <p>No phishing patterns detected in this URL.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        Analysis based on domain reputation and structural patterns
                    </div>
                </div>
            `;
            urlResult.classList.add('result-safe');
        }
    }, 1500);
}

// Simple phishing URL detection (for demo purposes)
function detectPhishingURL(url) {
    const phishingPatterns = [
        'paypal-security',
        'apple-verify',
        'google-login',
        'amazon-account',
        'microsoft-online',
        'banking-secure',
        'login-verify'
    ];
    
    const suspiciousDomains = [
        'secure-login',
        'account-verify',
        'password-reset'
    ];
    
    // Check for suspicious patterns in URL
    for (let pattern of phishingPatterns) {
        if (url.toLowerCase().includes(pattern)) {
            return true;
        }
    }
    
    // Check for IP addresses in URL (common in phishing)
    const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    if (ipRegex.test(url)) {
        return true;
    }
    
    // Random chance for demo (30% chance of being flagged as phishing)
    return Math.random() < 0.3;
}

// File Scanner
function scanFile() {
    const fileInput = document.getElementById('fileScanInput');
    const fileResult = document.getElementById('fileResult');
    
    if (!fileInput.files.length) {
        fileResult.innerHTML = '<p style="color: var(--warning);">Please select a file to scan</p>';
        return;
    }
    
    const file = fileInput.files[0];
    const fileName = file.name;
    
    // Show loading state
    fileResult.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-cog fa-spin" style="margin-right: 10px;"></i>
            <span>Scanning ${fileName}...</span>
        </div>
    `;
    
    // Simulate AI scanning
    setTimeout(() => {
        // For demo purposes, use file extension and size to "detect" threats
        const isMalicious = detectMaliciousFile(file);
        
        if (isMalicious) {
            fileResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-bug" style="color: var(--danger); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--danger); margin-bottom: 10px;">Malware Detected!</h4>
                    <p>This file contains patterns consistent with malware.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        File: ${fileName}<br>
                        Threat: Trojan.Generic
                    </div>
                </div>
            `;
            fileResult.classList.add('result-danger');
        } else {
            fileResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-shield-alt" style="color: var(--success); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--success); margin-bottom: 10px;">File is Clean</h4>
                    <p>No malicious patterns detected in this file.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        File: ${fileName}<br>
                        Scan: Heuristic analysis completed
                    </div>
                </div>
            `;
            fileResult.classList.add('result-safe');
        }
    }, 2000);
}

// Simple malicious file detection (for demo purposes)
function detectMaliciousFile(file) {
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif'];
    const fileName = file.name.toLowerCase();
    
    // Check for dangerous extensions
    for (let ext of dangerousExtensions) {
        if (fileName.endsWith(ext)) {
            // Higher chance of flagging executables
            return Math.random() < 0.6;
        }
    }
    
    // Check file size (very small or very large files might be suspicious)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB < 0.01 || fileSizeMB > 50) {
        return Math.random() < 0.4;
    }
    
    // Random chance for demo (15% chance of being flagged as malicious)
    return Math.random() < 0.15;
}

// Spam Email Detection
function detectSpam() {
    const emailInput = document.getElementById('emailInput');
    const emailResult = document.getElementById('emailResult');
    const emailText = emailInput.value.trim();
    
    if (!emailText) {
        emailResult.innerHTML = '<p style="color: var(--warning);">Please enter email content to analyze</p>';
        return;
    }
    
    // Show loading state
    emailResult.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-cog fa-spin" style="margin-right: 10px;"></i>
            <span>Analyzing email content...</span>
        </div>
    `;
    
    // Simulate AI analysis
    setTimeout(() => {
        // For demo purposes, use keyword matching
        const isSpam = detectSpamEmail(emailText);
        
        if (isSpam) {
            emailResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-envelope-open-text" style="color: var(--warning); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--warning); margin-bottom: 10px;">Spam Email Detected</h4>
                    <p>This email shows characteristics of spam or phishing.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        Confidence: ${Math.floor(Math.random() * 30) + 70}%<br>
                        Category: Promotional/Phishing
                    </div>
                </div>
            `;
            emailResult.classList.add('result-warning');
        } else {
            emailResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-inbox" style="color: var(--success); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--success); margin-bottom: 10px;">Email Appears Legitimate</h4>
                    <p>No spam patterns detected in this email.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        Confidence: ${Math.floor(Math.random() * 20) + 80}%<br>
                        Category: Personal/Legitimate
                    </div>
                </div>
            `;
            emailResult.classList.add('result-safe');
        }
    }, 1500);
}

// Simple spam email detection (for demo purposes)
function detectSpamEmail(text) {
    const spamKeywords = [
        'winner', 'prize', 'free', 'guaranteed', 'risk-free', 
        'act now', 'limited time', 'click here', 'unsubscribe',
        'congratulations', 'urgent', 'important notification',
        'account suspended', 'verify your account', 'password expired'
    ];
    
    const lowerText = text.toLowerCase();
    
    // Count spam keywords
    let spamScore = 0;
    for (let keyword of spamKeywords) {
        if (lowerText.includes(keyword)) {
            spamScore++;
        }
    }
    
    // Check for excessive use of exclamation marks
    const exclamationCount = (lowerText.match(/!/g) || []).length;
    if (exclamationCount > 3) {
        spamScore += 2;
    }
    
    // Check for all caps sentences
    const allCapsRegex = /[A-Z]{5,}/g;
    const allCapsMatches = lowerText.match(allCapsRegex);
    if (allCapsMatches && allCapsMatches.length > 1) {
        spamScore += 2;
    }
    
    return spamScore >= 3 || Math.random() < 0.25;
}

// Video Activity Detection
function analyzeVideo() {
    const videoInput = document.getElementById('videoInput');
    const videoResult = document.getElementById('videoResult');
    
    if (!videoInput.files.length) {
        videoResult.innerHTML = '<p style="color: var(--warning);">Please select a video file to analyze</p>';
        return;
    }
    
    const file = videoInput.files[0];
    const fileName = file.name;
    
    // Show loading state
    videoResult.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-cog fa-spin" style="margin-right: 10px;"></i>
            <span>Analyzing video content...</span>
        </div>
    `;
    
    // Simulate AI video analysis (longer processing time)
    setTimeout(() => {
        // For demo purposes, random result with higher chance of being safe
        const hasSuspiciousActivity = Math.random() < 0.2;
        
        if (hasSuspiciousActivity) {
            videoResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-eye" style="color: var(--warning); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--warning); margin-bottom: 10px;">Suspicious Activity Detected</h4>
                    <p>AI analysis detected potentially harmful content in this video.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        File: ${fileName}<br>
                        Detected: Unusual motion patterns
                    </div>
                </div>
            `;
            videoResult.classList.add('result-warning');
        } else {
            videoResult.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-video" style="color: var(--success); font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="color: var(--success); margin-bottom: 10px;">Video Analysis Complete</h4>
                    <p>No suspicious activity detected in this video.</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                        File: ${fileName}<br>
                        Analysis: Behavioral pattern recognition
                    </div>
                </div>
            `;
            videoResult.classList.add('result-safe');
        }
    }, 3000);
}

// Add CSS for progress animation
const style = document.createElement('style');
style.textContent = `
    @keyframes progress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
    }
`;
document.head.appendChild(style);