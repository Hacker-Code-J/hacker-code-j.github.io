---
title: "DLP calculator"
description: "2023-2 Advanced Application Programming."
date: 2023-12-10
last_modified_at: 2025-12-10
tags: [c, big-num]
language: c
# Option A: put the full GitHub URL explicitly
github_url: "https://github.com/Hacker-Code-J/DLP_calculator"

# Option B (preferred): just give the path in the repo and let the template build the link
# source_path: "path/to/file.py"

# Optional extras
# permalink: /codes/sample-tool/
# published: true
---


<!-- # 🌐 Big Integer Arithmetic Library & Discrete Logarithm Calculator
[![Version Badge](https://img.shields.io/badge/version-1.0.0-blue)]() [![License Badge](https://img.shields.io/badge/license-MIT-green)]()

**_Visit [P.A.N.D.A.'s PUBAO Homepage](https://hacker-code-j.notion.site/2023-Fall-AAP-Team-3-P-A-N-D-A-FUBAO-8a09720a080c4ad5859913331f832d55?pvs=4)_**


This repository provides implementations of **Big Integer operations** and **Discrete Logarithm Problem** calculators.

- DLP_calculator/
    - hash/
      - hash.c
      - hash.h
      - main.c
      - Makefile
    - images/
      - PANDA_logo.png
    - Tests/
      - measure.c
      - measure.h
    - Views/
      - compare_chart.py
      - DIV_compare_chart.py
      - FastRed_compare_chart.py
      - MUL_compare_chart.py
      - SQU_compare_chart.py
      - success_chart.py
    - .gitignore
    - arithmetic.h
    - arithmetic.c
    - config.h
    - Doxyfile
    - Doxyfile.bak
    - libpubao.a
    - LICENSE.md
    - main.c
    - Makefile
    - README.md
    - utils.c
    - utils.h

<!-- - big_int_dlp_library/
    - docs/
        - installation.md
        - usage.md
        - ...
    - src/
        - c/
            - bigint/
                - bigint.h
                - bigint.c
            - dlp/
                - dlp.h
                - dlp.c
        - python/
            - bigint/
                - __init__.py
                - bigint.py
            - dlp/
                - __init__.py
                - dlp.py
    - tests/
        - c/
            - bigint/
                - test_bigint.c
            - dlp/
                - test_dlp.c
        - python/
            - bigint/
                - test_bigint.py
            - dlp/
                - test_dlp.py
    - examples/
        - c/
            - example_bigint.c
            - example_dlp.c
        - python/
            - example_bigint.py
            - example_dlp.py
    - scripts/
        - build.sh
        - test.sh
    - README.md
    - LICENSE
    - .gitignore
    - setup.py (for the Python package)
    - Makefile (for the C code compilation) -->


<!-- ## 📌 Table of Contents

- [🌐 Big Integer Arithmetic Library \& Discrete Logarithm Calculator](#-big-integer-arithmetic-library--discrete-logarithm-calculator)
  - [📌 Table of Contents](#-table-of-contents)
  - [🛠 Installation](#-installation)
    - [C](#c)
    - [💡 Usage](#-usage)
  - [C](#c-1)
  - [📖 Docs](#-docs)
  - [🤝 Contributing](#-contributing)
  - [📜 License](#-license)

## 🛠 Installation

### C
- **Clone and Build**:

```bash
git clone https://github.com/Hacker-Code-J/DLP_calculator.git
cd DLP_calculator
make rebuild
make success
```
<!-- ### Python
- **Install via pip**:
```python
pip install ./path/to/repo
``` -->
<!-- 
### 💡 Usage
## C
- **Big Integer**:
```bash
./bigint
```
- **DLP**:
```bash
./dlp
```

<!-- ### Python
1. **Install via pip**:
```python
from big_int_dlp_library.python import bigint, dlp
``` -->

<!-- ## 📖 Docs
📁 Dive deeper with the [docs/](docs/) directory.

## 🤝 Contributing
🖋 Want to contribute? Awesome! Please refer to `CONTRIBUTING.md`.

## 📜 License
🔐 This project is under a license. Kindly check the [LICENSE](LICENSE) file.
 --> 
 
 <link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<div id="password-prompt" style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%); padding: 2rem;">
  <div style="background: white; padding: 4rem; border-radius: 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04); max-width: 420px; width: 100%; border: 1px solid #e5e7eb;">
    <div style="text-align: center; margin-bottom: 2.5rem;">
      <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; box-shadow: 0 8px 24px rgba(0, 102, 204, 0.2);">🔐</div>
      <h2 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 1.5rem; font-weight: 700;">Access Restricted</h2>
      <p style="color: #6b7280; margin: 0; font-size: 0.95rem; line-height: 1.5;">This content requires authentication.<br>Please enter your access credentials.</p>
    </div>
    
    <div style="margin-bottom: 2rem;">
      <input type="password" id="password-input" placeholder="Enter password" style="width: 100%; padding: 0.9rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 0.95rem; box-sizing: border-box; transition: all 0.3s; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" onfocus="this.style.borderColor='#0066cc'; this.style.boxShadow='0 0 0 3px rgba(0, 102, 204, 0.1)'" onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">
      <div id="error-message" style="color: #dc2626; font-size: 0.85rem; margin-top: 0.5rem; display: none;"></div>
    </div>
    
    <button onclick="checkPassword()" style="width: 100%; padding: 0.95rem 1rem; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);" onmouseover="this.style.boxShadow='0 6px 20px rgba(0, 102, 204, 0.4)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 4px 12px rgba(0, 102, 204, 0.3)'; this.style.transform='translateY(0)';">Access Content</button>
    
    <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #f3f4f6;">
      <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">Protected by secure access control</p>
    </div>
  </div>
</div>

<div id="content" style="display: none;">
  <!-- Content goes here - add your markdown content inside this div -->
</div>

<script>
const correctPassword = "wjssmdgktlsdkzkfmxm"; // Change this to your desired password

function checkPassword() {
  const inputPassword = document.getElementById("password-input").value;
  const errorMessage = document.getElementById("error-message");
  
  if (inputPassword === correctPassword) {
    document.getElementById("password-prompt").style.opacity = "0";
    document.getElementById("password-prompt").style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      document.getElementById("password-prompt").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 300);
    errorMessage.style.display = "none";
  } else {
    errorMessage.textContent = "Invalid password. Please try again.";
    errorMessage.style.display = "block";
    document.getElementById("password-input").value = "";
    document.getElementById("password-input").focus();
    document.getElementById("password-input").style.borderColor = "#dc2626";
    setTimeout(() => {
      document.getElementById("password-input").style.borderColor = "#e5e7eb";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const passwordInput = document.getElementById("password-input");
  
  // Allow Enter key to submit
  passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      checkPassword();
    }
  });
  
  passwordInput.focus();
});
</script>