export type UserRole = "student" | "lecturer" | "admin";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  program: string;
  avatar?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServiceProviderProfile {
  _id?: string;
  user?: string; // user id
  bio?: string;
  categories?: string[];
  location?: string;
  portfolio?: string[];
  availableDates?: string[]; // ISO strings
}

export interface Service {
  _id: string;
  provider: string | ServiceProviderProfile;
  title: string;
  description?: string;
  category?: string;
  price?: number;
  location?: string;
}

export interface ConversationSummary {
  _id: string;
  participant: {
    _id: string;
    username: string;
    avatar?: string;
  };
  lastMessage?: Message;
  lastMessageAt?: string;
  isActive?: boolean;
}

export interface Message {
  _id: string;
  senderId: { _id: string; username: string; avatar?: string } | string;
  receiverId: { _id: string; username: string; avatar?: string } | string;
  conversationId: string;
  content: string;
  messageType: "text";
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  service: string | Service;
  customer: string | User;
  provider: string | ServiceProviderProfile;
  date: string; // ISO string
  time: string; // e.g. "14:00"
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
export interface BookingInput {
  serviceId: string;
  date: string; // ISO string
  time: string; // e.g. "14:00"
}
export interface BookingUpdateInput {
  status: "pending" | "confirmed" | "cancelled";
}
export interface ProviderOnboardingInput {
  bio?: string;
  categories?: string[];
  location?: string;
  portfolio?: File[]; // Array of files for portfolio images
  availableDates?: string[]; // ISO strings
}
export interface UpdateProfileInput {
  username?: string;
  email?: string;
  bio?: string;
  location?: string;
  avatar?: File; // This will hold the file, not the URL
}
export interface AuthResponse {
  token: string;
  user: User;
}
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface ResetPasswordInput {
  email: string;
  newPassword: string;
}
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
export interface ForgotPasswordInput {
  email: string;
}
export interface ResetPasswordToken {
  token: string;
  userId: string;
}
export interface ServiceCategory {
  _id: string;
  name: string;
  description?: string;
  icon?: string; // URL to an icon image
}
export interface ServiceCategoryInput {
  name: string;
  description?: string;
  icon?: File; // File for the icon image
}
export interface ServiceCategoryUpdateInput {
  name?: string;
  description?: string;
  icon?: File; // File for the icon image
}
export interface Notification {
  _id: string;
  userId: string; // User who receives the notification
  type: "booking" | "message" | "system";
  content: string; // e.g. "New booking request"
  isRead: boolean;
  createdAt: string;
}
export interface NotificationInput {
  type: "booking" | "message" | "system";
  content: string; // e.g. "New booking request"
}
export interface NotificationUpdateInput {
  isRead: boolean;
}
