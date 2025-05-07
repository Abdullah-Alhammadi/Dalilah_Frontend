# Dalilah_Frontend

# Identity and Theme

## Project Identity

**Dalilah** is a user-friendly platform designed to help visitors and locals discover the best places within major cities. The core idea is to rely on real recommendations from locals rather than generic tourist attractions, creating a more authentic travel and exploration experience.

- **Project Name:** Dalilah (دليلة)
- **Slogan:** Discover like a local!
- **Target Audience:** 
  - Tourists and travelers exploring new cities.
  - Local residents seeking new experiences and places.
- **Main Goal:** 
  - Provide an easy and trusted way to find great places through user-generated recommendations.
  - Highlight the authentic culture and hotspots of each city.

## Visual Identity

- **Overall Mood:** Friendly, reliable, vibrant, and adventurous.
- **Logo Concept:** 
  - Map pin (📍) or compass (🧭) representing discovery and navigation.
- **Primary Colors:**
  - Sky Blue (#5DADE2) — Trust, clarity, and adventure.
  - Light Green (#58D68D) — Nature, freshness, and activity.
  - White (#FFFFFF) — Clean design and readability.
  - Optional Accent: Soft Yellow (#F7DC6F) — Energy and positivity.
- **Typography:** 
  - Modern and simple fonts such as Poppins or Open Sans to ensure readability and a clean look.
- **Design Style:**
  - Clean card-based layout to showcase places and reviews.
  - High-quality images for places.
  - Minimalistic icons for easy navigation.

## Website Experience

Dalilah provides users with a seamless experience where they can:
- Browse random reviews without an account.
- Sign up or log in to access personalized features.
- Easily browse by city and category.
- Add new places through a simple and guided form.
- Write and view detailed reviews to share real experiences.

The platform aims to feel like a **friendly local guide** in your pocket!



## 🌐 Frontend Routes

<table border="1">
<tr><th>Path</th><th>Component</th><th>Description</th></tr>
<tr><td>/</td><td>HomePage</td><td>Landing page with video and animated welcome message</td></tr>
<tr><td>/about</td><td>AboutPage</td><td>About Dalilah and the idea behind it</td></tr>
<tr><td>/explore</td><td>CityPage</td><td>Select a city to explore (Riyadh or Abha)</td></tr>
<tr><td>/categories</td><td>CategoryPage</td><td>Choose a category after selecting a city</td></tr>
<tr><td>/places</td><td>PlacesPage</td><td>List of places in the selected city and category</td></tr>
<tr><td>/places/add</td><td>AddPlacePage</td><td>Form to add a new recommended place</td></tr>
<tr><td>/recommendations</td><td>YourRecommendationsPage</td><td>View and manage places added by the current user</td></tr>
<tr><td>/places/:placeId</td><td>PlaceDetailPage</td><td>Details page for a specific place, with reviews</td></tr>
<tr><td>/places/edit/:placeId</td><td>EditPlacePage</td><td>Edit an existing recommended place</td></tr>
<tr><td>/signup</td><td>SignupPage</td><td>Create a new user account</td></tr>
<tr><td>/login</td><td>LoginPage</td><td>Sign into an existing account</td></tr>
</table>
