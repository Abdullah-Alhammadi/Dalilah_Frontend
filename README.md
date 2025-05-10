# 🌐 Dalilah Frontend

Dalilah is a vibrant web platform that helps locals and tourists discover authentic places in major cities like Riyadh and Abha — all based on real user recommendations.

---

## 🎯 Project Identity

- **Name:** Dalilah (دليلة)
- **Slogan:** Discover like a local!
- **Target Users:** Tourists, locals, and city explorers
- **Main Goal:** Make it easy to explore trustworthy places with real recommendations from the community

---

## 🎨 Visual Identity

- **Primary Colors:**
  - Sky Blue `#5DADE2`
  - Light Green `#58D68D`
  - White `#FFFFFF`
  - Accent: Soft Yellow `#F7DC6F`
- **Typography:** Poppins & Open Sans
- **Design Style:** Clean, modern, and card-based with minimal UI

---

## 💻 Website Features

- Fully responsive interface using React
- Video hero section with animated welcome header
- Smooth route transitions with protected access
- Review system with edit/delete options
- Dynamic splash loader and page transitions
- Conditional rendering based on user state
- Google Maps label opens in a new tab
- "Your Recommendations" page with full CRUD support

---

## 🌐 Frontend Routes

| Path                    | Component               | Description                                      |
|-------------------------|--------------------------|--------------------------------------------------|
| `/`                     | HomePage                | Landing with animated header + video             |
| `/about`                | AboutPage               | Description of Dalilah’s mission and idea        |
| `/explore`              | CityPage                | Select a city (Riyadh or Abha)                   |
| `/categories`           | CategoryPage            | Choose a category after city selection           |
| `/places`               | PlacesPage              | List of filtered places by city and category     |
| `/places/add`           | AddPlacePage            | Submit a new place with form                     |
| `/recommendations`      | YourRecommendationsPage | Manage user-submitted places (edit/delete)       |
| `/places/:placeId`      | PlaceDetailPage         | Details of a place + reviews section             |
| `/places/edit/:placeId` | EditPlacePage           | Update previously added place                    |
| `/signup`               | SignupPage              | Register new user account                        |
| `/login`                | LoginPage               | Login to existing account                        |

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (Vite)
- **Routing:** React Router DOM
- **Authentication:** JWT with Axios
- **Styling:** Vanilla CSS + Custom Components
- **State Management:** useState, useEffect
- **Deployment:** Docker (local development)

---

## ❄️ IceBox Features

- ⭐ **Place Rating System:** Allow users to rate places based on experience  
- 📌 **Top Contributor Badges:** Highlight users who add quality places or reviews  
- 🖼️ **Image Uploads:** Let users attach photos to places they add  
- 🗺️ **Interactive Maps:** Embed Google Maps for dynamic location display  
- 🔔 **Real-Time Notifications:** Alert users about new reviews or updates  
- 🌍 **User Profiles:** Public pages showing user's added places and reviews  
- 📲 **Social Media Sharing:** Share reviews or places to Twitter, Instagram, etc.  
- 🧠 **Smart Suggestions:** Recommend places based on what users interact with  

---

## 🔗 Project Links

| Item            | Link                          |
|-----------------|-------------------------------|
| Backend         | http://localhost:8000         |
| Frontend        | http://localhost:5173         |
| Frontend Repo   | https://github.com/Abdullah-Alhammadi/Dalilah_Frontend |
| Backend Repo    | https://github.com/Abdullah-Alhammadi/Dalilah_Backend  |

---

## 🐳 Installation (Docker)

```bash
# Clone the project
git clone <your-backend-repo-url>
cd dalilah_backend

# Start Docker
docker compose up --build

```
