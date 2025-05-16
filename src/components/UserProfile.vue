<template>
    <section class="user-profile">
      <h2 class="profile-title">Edit Profile</h2>
  
      <div class="profile-content">
        <form class="profile-form" @submit.prevent="saveChanges">
          <div class="avatar-container">
            <img :src="avatarUrl" alt="Avatar" class="avatar" />
            <button type="button" class="edit-avatar" @click="uploadAvatar">
              ✎
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onAvatarSelected"
            />
          </div>
  
          <div class="field">
            <label>Full Name</label>
            <input v-model="form.name" type="text" />
          </div>
  
          <div class="field">
            <label>Email</label>
            <div class="input-check">
              <input v-model="form.email" type="email" />
              <span v-if="validEmail" class="checkmark">✔</span>
            </div>
          </div>
  
          <div class="field">
            <label>Number</label>
            <div class="input-check">
              <input v-model="form.phone" type="tel" />
              <span v-if="validPhone" class="checkmark">✔</span>
            </div>
          </div>
  
          <div class="field">
            <label>City</label>
            <input v-model="form.city" type="text" />
          </div>
  
          <div class="two-columns">
            <div class="field">
              <label>State</label>
              <input v-model="form.state" type="text" />
            </div>
            <div class="field">
              <label>Post Code</label>
              <input v-model="form.post" type="text" />
            </div>
          </div>
  
          <div class="field">
            <label>Country</label>
            <div class="input-with-flag">
              <img :src="countryFlag" alt="" class="flag" />
              <select v-model="form.country">
                <option value="US">United States</option>
                <option value="AU">Australia</option>
                <!-- add more countries if we want -->
              </select>
            </div>
          </div>
  
          <div class="form-actions">
            <button type="button" class="btn secondary" @click="goBack">
              Back To Home
            </button>
            <button type="submit" class="btn primary">
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  const form = reactive({
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    phone: '0404-040-040',
    city: 'Adelaide, Australia',
    state: 'South Australia',
    postCode: '5000',
    country: 'AUS',
  })
  const avatarUrl = ref('https://via.placeholder.com/120') // replace with real
  const countryFlag = computed(() => {
    switch (form.country) {
      case 'US': return 'https://flagcdn.com/w20/us.png'
      case 'AU': return 'https://flagcdn.com/w20/au.png'
      default:   return ''
    }
  })
  const validEmail = computed(() => /\S+@\S+\.\S+/.test(form.email))
  const validPhone = computed(() => /^\d{3}-\d{3}-\d{3}-\d{2}$/.test(form.phone))
  
  const fileInput = ref(null)
  function uploadAvatar() {
    fileInput.value.click()
  }
  function onAvatarSelected(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => (avatarUrl.value = reader.result)
    reader.readAsDataURL(file)
  }

 const userId = 1;  // manually set user ID for now

async function saveChanges() {
  try {
    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Profile updated', data);
    } else {
      console.error('Error updating profile', data);
    }
  } catch (err) {
    console.error('Network error:', err);
  }
}

  function goBack() {
    // router.back() or similar
    console.log('go home')
  }
  </script>
  
  <style scoped>
  .user-profile {
    padding: 24px;
    background: var(--bg-secondary);
  }
  .profile-title {
    margin-bottom: 24px;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
  .profile-content {
    display: flex;
    gap: 32px;
  }
  .profile-form {
    flex: 1;
    background: var(--bg-primary);
    padding: 24px;
    border-radius: 12px;
    /* use your variable shadows: */
    box-shadow: var(--shadow-card);
  }
  
  /* avatar */
  .avatar-container {
    position: relative;
    width: 120px;
    margin: 0 auto 24px;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--text-secondary);
  }
  .edit-avatar {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--text-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  .hidden { display: none; }
  
  /* form fields */
  .field {
    margin-bottom: 16px;
  }
  .field label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: var(--text-secondary);
  }
  .field input,
  .field select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--text-secondary);
    border-radius: 6px;
    font-size: 1rem;
    background: var(--bg-primary);
    color: var(--text-primary);
  }
  
  /* checkbox icon */
  .input-check { position: relative; }
  .checkmark {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: green;
    font-size: 1.1rem;
  }
  
  .two-columns {
    display: flex;
    gap: 16px;
  }
  .input-with-flag {
    display: flex;
    align-items: center;
  }
  .flag {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
  
  /* buttons */
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
  .btn {
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .btn.primary {
    background: var(--text-primary);
    color: var(--bg-primary);
  }
  .btn.secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-color: var(--text-secondary);
  }
  </style>