# Tổng hợp Flow và Chức năng Outfy Web App

Tài liệu này tổng hợp các luồng người dùng (User Flows) và chức năng chính của ứng dụng Outfy, dựa trên cấu trúc dự án hiện tại.

## 1. Tổng Quan
Outfy là ứng dụng thời trang tích hợp AI, cho phép người dùng quản lý tủ đồ ảo, thử đồ trên avatar 3D, nhận tư vấn từ AI Stylist và mua sắm các sản phẩm thời trang.

## 2. Các Luồng Người Dùng Chính (User Flows)

### 2.1. Xác thực (Authentication Flow)
Luồng đăng ký và đăng nhập của người dùng.
- **Login**: `app/(auth)/login` - Đăng nhập bằng Email/Phone/Social.
- **Register**: `app/(auth)/register` - Đăng ký tài khoản mới.
- **OTP Verification**: `app/(auth)/otp` - Xác thực mã OTP (cho đăng ký/quên mật khẩu).
- **Terms**: `app/(auth)/terms` - Xem điều khoản sử dụng.

### 2.2. Tạo Avatar & Onboarding (Avatar Creation Flow)
Người dùng mới hoặc hiện tại tạo bản sao kỹ thuật số 3D của mình.
- **Start**: `app/start` - Màn hình bắt đầu / Onboarding.
- **Avatar Setup**: `app/avatar/setup` - Chọn giới tính, phong cách cơ bản.
- **Measurements**: `app/avatar/measurements` - Nhập số đo cơ thể (chiều cao, cân nặng, v.v.).
- **Scan**: `app/avatar/scan` - Tải lên ảnh hoặc quét cơ thể để AI tạo modell.
- **Result**: `app/avatar/result` - Xem và xác nhận Avatar 3D đã tạo.

### 2.3. Quản lý Tủ đồ & Thử đồ (Wardrobe & Try-On Flow)
Chức năng cốt lõi cho phép người dùng xem tủ đồ và mix-match.
- **View Wardrobe**: `app/(main)/wardrobe` - Xem danh sách quần áo đã số hóa.
- **Try-On**: Kéo thả hoặc chọn items để thử trực tiếp lên Avatar 3D.
- **Categorization**: Lọc theo danh mục (Tops, Bottoms, Shoes, etc.).

### 2.4. Số hóa Quần áo (Upload & Digitalize Flow)
Quy trình đưa quần áo thực tế vào ứng dụng.
- **Upload**: `app/upload` - Chụp ảnh hoặc tải ảnh quần áo lên.
- **Category**: `app/upload/category` - Phân loại món đồ (Áo, Quần, Váy...).
- **Attributes**: `app/upload/attributes` - Nhập thông tin chi tiết (Màu, hãng, size, chất liệu).
- **Preview**: `app/upload/preview` & `preview-detail` - Xem trước kết quả sau khi AI xử lý (tách nền).
- **Processing**: `app/upload/processing` - Màn hình chờ xử lý ảnh.

### 2.5. Tư vấn & Phân tích (AI Intelligence Flows)
- **AI Stylist**: `app/(main)/ai-stylist` - Chat với AI để nhận gợi ý phối đồ theo dịp/thời tiết.
- **AI Fit Analysis**:
    - `app/ai-fit-analysis` - Tải lên/Chọn món đồ cần phân tích.
    - `app/ai-fit-analysis/result` - Nhận kết quả phân tích độ vừa vặn và gợi ý size.

### 2.6. Mua sắm & Khám phá (Shopping & Discovery)
- **Home Feed**: `app/(main)/home` - Xem tin tức, brands nổi bật, gợi ý outfit.
- **Product Detail**: `app/product/[id]` - Xem chi tiết sản phẩm, giá, và thử lên Avatar.
- **Gen-Z Community**: `app/(gen-z)` - Landing page/Khu vực dành riêng cho cộng đồng Gen Z.

### 2.7. Tính năng Khác
- **Outfit Duel**: `app/outfit-duel` - So sánh 2 bộ trang phục (Gamification).
- **Share Look**: `app/share-look` - Chia sẻ outfit đã phối lên mạng xã hội.
- **Profile**: `app/(main)/profile` - Quản lý tài khoản cá nhân.

## 3. Cấu trúc Chức năng theo Thư mục (Folder Map)

```
app/
├── (auth)/                 # Xác thực
│   ├── login/              # Đăng nhập
│   ├── register/           # Đăng ký
│   ├── otp/                # Nhập OTP
│   └── terms/              # Điều khoản
├── (main)/                 # Giao diện chính (có Bottom Bar)
│   ├── home/               # Trang chủ (Newsfeed)
│   ├── wardrobe/           # Tủ đồ & Avatar
│   ├── ai-stylist/         # Trợ lý ảo Stylist
│   └── profile/            # Hồ sơ cá nhân
├── upload/                 # Flow upload quần áo
│   ├── category/           # Chọn loại
│   ├── attributes/         # Chọn thuộc tính
│   └── processing/         # Xử lý ảnh
├── avatar/                 # Flow tạo Avatar
│   ├── measurements/       # Nhập số đo
│   └── scan/               # Scan/Upload ảnh body
├── ai-fit-analysis/        # Phân tích độ vừa vặn
├── outfit-duel/            # So sánh outfit
├── share-look/             # Chia sẻ outfit
├── product/[id]/           # Chi tiết sản phẩm
└── (gen-z)/                # Landing page Gen Z
```

## 4. Công Nghệ Chính
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **State Management**: Zustand (Auth, Avatar, Wardrobe stores).
- **Data Fetching**: React Query + Axios.
- **UI Components**: Shadcn/UI, Framer Motion.
