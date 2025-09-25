# 👁️ CRMPCFProject – Masked Field Control (Form Only)

## 📌 Overview

**CRMPCFProject** is a Power Apps Component Framework (PCF) control that allows you to **mask and reveal field values** on a Model-driven form.

- By default, the field is **masked (******)** and **read-only**.
- When clicking the **👁️ icon**:
  - The real value is revealed.
  - The field becomes **editable**.
- Clicking **🙈** again:
  - Masks the value back.
  - Sets the field back to **read-only**.

⚠️ Works only on **forms**, not in views or editable grids.

---

## 🎯 Supported Field Types

This control can be applied to the following Dataverse field types:

- Single Line of Text  
- Email  
- Phone  
- Whole Number  
- Option Set (Choice)  

---

## 📦 Download & Installation

### Option 1 – Import Ready Solution

1. Download the **[CRMSolution.zip](#)** file.  
2. Import the solution into your **Dataverse / Power Apps environment**.  
3. Publish all customizations.

### How to Use

1. Open your **Model-driven form designer**.  
2. Select a supported field (e.g., Email, Phone, Whole Number).  
3. Under **Components → Add Control**, choose **CRMPCFProject**.  
4. Save and publish the form.  
5. Open the form in your app:
   - Field shows **masked by default**.  
   - Click **👁️** to reveal & edit.  
   - Click **🙈** to hide & lock again.  

---

## 🔒 Limitations

- Only works on **forms** (not on views/grids).  
- Only masks the **displayed value**, not the stored value.  
- Not supported for:
  - Multi-line Text  
  - Date/Time  
  - Lookup fields  

---

## ⚙️ License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
