# 🧥 Outfy Web — Kế hoạch xây dựng ứng dụng Next.js

## 1. Tổng quan dự án

**Outfy Web** là phiên bản web của ứng dụng thời trang Outfy (hiện có trên Flutter/Mobile). Ứng dụng cho phép người dùng:
- Quản lý tủ quần áo ảo (Wardrobe)
- Thử quần áo lên avatar 3D
- Nhận gợi ý outfit từ AI Stylist
- Upload / phân loại quần áo
- So sánh outfit (Outfit Duel)
- Xem phân tích fit AI (AI Fit Analysis)
- Mua sắm sản phẩm từ các thương hiệu nổi tiếng

---

## 2. Tech Stack

| Hạng mục | Công nghệ | Ghi chú |
|---|---|---|
| Framework | **Next.js 16** (App Router) | SSR + SSG |
| Ngôn ngữ | **TypeScript** | Type-safe |
| Styling | **Tailwind CSS** | Utility-first |
| UI Components | **shadcn/ui** + tự build | Accessible |
| State Management | **Zustand** | Nhẹ, dễ dùng |
| HTTP Client | **Axios + React Query** | Cache & sync |
| Animation | **Framer Motion** | Mượt mà |
| Icons | **Lucide React** | Giống flutter `lucide_icons` |
| Form | **React Hook Form + Zod** | Validate mạnh |
| Auth | **NextAuth.js** | JWT, OTP flow |
| Fonts | **Inter** (Google Fonts) | Hiện đại |
| Linting | **ESLint + Prettier** | Code quality |
| Testing | **Vitest + Playwright** | Unit + E2E |

---

## 3. Cấu trúc thư mục

```
outfy-web/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: Auth
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── otp/
│   │       └── page.tsx
│   ├── (main)/                   # Route group: App chính (có bottom nav)
│   │   ├── layout.tsx            # Layout với Bottom Navigation
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── wardrobe/
│   │   │   └── page.tsx
│   │   ├── ai-stylist/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── upload/
│   │   ├── page.tsx              # Upload Clothing
│   │   ├── category/
│   │   │   └── page.tsx          # Clothing Category
│   │   ├── attributes/
│   │   │   └── page.tsx          # Item Attributes
│   │   └── processing/
│   │       └── page.tsx          # Garment Processing
│   ├── avatar/
│   │   ├── setup/
│   │   │   └── page.tsx          # Avatar Setup
│   │   ├── measurements/
│   │   │   └── page.tsx          # Body Measurements
│   │   └── scan/
│   │       └── page.tsx          # Avatar Scan
│   ├── outfit-duel/
│   │   └── page.tsx
│   ├── share-look/
│   │   └── page.tsx
│   ├── ai-fit-analysis/
│   │   └── page.tsx
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Product Details
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Redirect → /home
│   └── globals.css
│
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── layout/
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx           # Desktop navigation
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── BrandCarousel.tsx
│   │   └── ProductGrid.tsx
│   ├── wardrobe/
│   │   ├── AvatarViewer.tsx
│   │   ├── WardrobeSheet.tsx
│   │   ├── ClothingGrid.tsx
│   │   ├── FilterPill.tsx
│   │   └── CategoryTabs.tsx
│   ├── upload/
│   │   ├── ImageUploader.tsx
│   │   ├── CategorySelector.tsx
│   │   └── AttributeForm.tsx
│   ├── avatar/
│   │   ├── MeasurementForm.tsx
│   │   └── ScanGuide.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ProductDetails.tsx
│   └── shared/
│       ├── ActionButton.tsx
│       ├── FilterChip.tsx
│       ├── LoadingSpinner.tsx
│       └── ProgressBar.tsx
│
├── lib/
│   ├── api/                      # API calls (Axios)
│   │   ├── auth.ts
│   │   ├── wardrobe.ts
│   │   ├── products.ts
│   │   └── avatar.ts
│   ├── hooks/                    # Custom hooks
│   │   ├── useWardrobe.ts
│   │   ├── useAuth.ts
│   │   └── useAvatar.ts
│   ├── store/                    # Zustand stores
│   │   ├── authStore.ts
│   │   ├── wardrobeStore.ts
│   │   └── avatarStore.ts
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── validators.ts
│   │   └── cn.ts                 # classnames helper
│   └── types/
│       ├── auth.ts
│       ├── product.ts
│       ├── wardrobe.ts
│       └── avatar.ts
│
├── public/
│   ├── images/
│   │   ├── banner.png
│   │   ├── product.png
│   │   ├── 3dfull.png
│   │   └── sumary3d.png
│   └── icons/
│
├── styles/
│   └── globals.css
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Thiết kế hệ thống màu & Theme

Dựa theo `AppTheme` từ Flutter app:

```css
/* globals.css */
:root {
  --primary: #b62aff;       /* Tím/purple — AppTheme.primary */
  --secondary: #ff6b35;     /* Cam/orange — AppTheme.secondary */
  --background: #f1f5f9;
  --surface: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --border-light: #e2e8f0;
}
```

---

## 5. Danh sách màn hình & Tính năng

### 5.1 Auth Feature

#### `/login` — Đăng nhập
- Form: Email/Phone + Password
- Nút "Quên mật khẩu", Link "Đăng ký"
- Social login (Google, Apple)

#### `/register` — Đăng ký
- Form: Tên, Email, Password, Confirm Password
- Validate realtime với Zod

#### `/otp` — Xác thực OTP
- 6 ô nhập PIN tự động focus
- Countdown timer (60s) + nút "Gửi lại"

---

### 5.2 Home Feature

#### `/home` — Trang chủ
- **Header**: Avatar người dùng (trái) + Tiêu đề "Outfy" (giữa) + Thông báo (phải)
- **Hero Banner**: Ảnh `banner.png` + gradient overlay + nút "Thử ngay"
- **Featured Brands**: Carousel ngang — Nike, Balenciaga, Gucci, Prada, Off-White
- **Gợi ý cho bạn**: Grid 2 cột → `ProductCard` (ảnh, tên, giá, nút Yêu thích, nút "Thử Avatar")

---

### 5.3 Wardrobe Feature

#### `/wardrobe` — Tủ quần áo
- **Avatar 3D** (phần trên): `sumary3d.png` (bán thân) / `3dfull.png` (toàn thân, click để toggle)
- **Bottom Sheet** (mobile) / **Side Panel** (desktop):
  - Filter pills: Bộ lọc, Cotton Tee, Slim Jeans
  - Category tabs: Tops | Bottoms | Shoes | Outfits
  - Grid 3 cột (mobile) / 5 cột (desktop) — item cuối là nút "Thêm +"
- **Floating Action Buttons** (góc phải): Chat 💬 | Thêm ➕ | Share 🔗 | Yêu thích ⭐ | AI ❓
- **Bottom Fixed Buttons**: Hoán đổi outfit ⇆ | Xóa 🗑️

---

### 5.4 Upload Clothing Flow (4 bước)

| Bước | Route | Nội dung |
|---|---|---|
| 1 | `/upload` | Drag & drop ảnh, camera, preview, AI background removal |
| 2 | `/upload/category` | Grid danh mục: Áo, Quần, Váy, Giày, Mũ, Phụ kiện |
| 3 | `/upload/attributes` | Màu sắc (swatches), Chất liệu, Thương hiệu, Size |
| 4 | `/upload/processing` | Loading animation + progress bar + kết quả |

---

### 5.5 Avatar Flow (3 bước)

| Bước | Route | Nội dung |
|---|---|---|
| 1 | `/avatar/setup` | Chọn giới tính, style cơ bản |
| 2 | `/avatar/measurements` | Nhập số đo: chiều cao, cân nặng, ngực, eo, hông |
| 3 | `/avatar/scan` | Upload 2 ảnh (front/side) → AI tạo avatar 3D |

---

### 5.6 Các tính năng còn lại

| Route | Tính năng |
|---|---|
| `/ai-stylist` | Chat messenger với AI — gợi ý outfit theo hoàn cảnh |
| `/outfit-duel` | Màn hình chia đôi, so sánh 2 outfit, vote + xem tỉ lệ % |
| `/share-look` | Preview look, chọn nền, caption, export / share mạng xã hội |
| `/ai-fit-analysis` | Upload quần áo → AI cho Fit Score, nhận xét, gợi ý size |
| `/product/[id]` | Carousel ảnh, chọn màu/size, Thêm giỏ hàng, Thử trên Avatar |
| `/profile` | Avatar, thống kê, Cài đặt, Đổi mật khẩu, Ngôn ngữ, Đăng xuất |

---

## 6. Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile (< 768px) | Bottom Navigation, single column, draggable sheets |
| Tablet (768–1024px) | Sidebar + 2-column grid |
| Desktop (> 1024px) | Fixed sidebar, multi-column grid, panels thay thế sheets |

---

## 7. State Management (Zustand)

```ts
// wardrobeStore.ts
interface WardrobeStore {
  clothingItems: ClothingItem[];
  selectedItem: ClothingItem | null;
  activeCategory: 'tops' | 'bottoms' | 'shoes' | 'outfits';
  isAvatarExpanded: boolean;
  setSelectedItem: (item: ClothingItem) => void;
  toggleAvatarExpanded: () => void;
}

// authStore.ts
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

---

## 8. API Endpoints (Backend interface)

| Endpoint | Method | Mô tả |
|---|---|---|
| `/api/auth/login` | POST | Đăng nhập |
| `/api/auth/register` | POST | Đăng ký |
| `/api/auth/otp/send` | POST | Gửi OTP |
| `/api/auth/otp/verify` | POST | Xác thực OTP |
| `/api/wardrobe` | GET | Lấy danh sách tủ đồ |
| `/api/wardrobe` | POST | Upload quần áo mới |
| `/api/wardrobe/:id` | DELETE | Xóa quần áo |
| `/api/avatar` | GET/POST | Lấy / Tạo avatar |
| `/api/products` | GET | Danh sách sản phẩm |
| `/api/products/:id` | GET | Chi tiết sản phẩm |
| `/api/ai/fit-analysis` | POST | Phân tích fit |
| `/api/ai/stylist` | POST | Chat AI Stylist |

---

## 9. Lộ trình phát triển (9 tuần)

| Phase | Thời gian | Nội dung |
|---|---|---|
| **Phase 1** | Tuần 1–2 | Khởi tạo dự án, design system, layout chính, sidebar/bottom nav |
| **Phase 2** | Tuần 2–3 | Auth: Login, Register, OTP, NextAuth.js, Zustand auth store |
| **Phase 3** | Tuần 3–4 | Home: Banner, Brand Carousel, ProductCard, Recommended Grid |
| **Phase 4** | Tuần 4–5 | Wardrobe: Avatar viewer, bottom sheet, clothing grid, filter pills |
| **Phase 5** | Tuần 5–6 | Upload flow 4 bước (drag & drop, category, attributes, processing) |
| **Phase 6** | Tuần 6–7 | Avatar flow 3 bước (setup, measurements, scan) |
| **Phase 7** | Tuần 7–8 | AI Stylist, Outfit Duel, AI Fit Analysis, Share Look |
| **Phase 8** | Tuần 8–9 | Profile, Product Detail, Dark mode, i18n (VI), SEO, Deploy Vercel |

---

## 10. Lệnh khởi tạo dự án

```bash
# Tạo dự án Next.js 16
npx create-next-app@latest outfy-web --typescript --tailwind --eslint --app

cd outfy-web

# Thêm shadcn/ui
npx shadcn@latest init

# Dependencies chính
npm install zustand axios @tanstack/react-query framer-motion
npm install lucide-react react-hook-form zod @hookform/resolvers
npm install next-auth clsx tailwind-merge
```

---

## 11. Quality Checklist

- [ ] Lighthouse Score ≥ 90 (Performance, Accessibility, SEO)
- [ ] Responsive: 375px / 768px / 1440px
- [ ] Dark mode hoạt động đúng
- [ ] TypeScript strict mode — zero errors
- [ ] Form validation đầy đủ
- [ ] Loading states cho mọi API call
- [ ] Error boundaries được thiết lập
- [ ] Tiếng Việt hiển thị đúng font
