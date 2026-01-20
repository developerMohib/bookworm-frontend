import { Icons } from "./icon";

// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  photo?: string;
}

export type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  badge?: number;
  roles: User["role"][];
};

export const COMMON_NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.HomeOutline,
    activeIcon: Icons.HomeSolid,
    roles: ["user", "admin", "moderator"],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: Icons.UsersOutline,
    activeIcon: Icons.UsersSolid,
    roles: ["user", "admin", "moderator"],
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Icons.NotificationOutline,
    roles: ["user", "admin", "moderator"],
    badge: 3, // Example badge count
  },
];

// User-specific items
export const USER_NAV_ITEMS: NavItem[] = [
  {
    name: "My Orders",
    href: "/dashboard/orders",
    icon: Icons.CartOutline,
    activeIcon: Icons.CartSolid,
    roles: ["user"],
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: Icons.DocumentsOutline,
    activeIcon: Icons.DocumentsSolid,
    roles: ["user"],
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: Icons.BillingOutline,
    roles: ["user"],
  },
];

// Admin-specific items
export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    name: "Admin Panel",
    href: "/dashboard",
    icon: Icons.AdminOutline,
    activeIcon: Icons.AdminSolid,
    roles: ["admin"],
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: Icons.AnalyticsOutline,
    activeIcon: Icons.AnalyticsSolid,
    roles: ["admin"],
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Icons.UsersOutline,
    activeIcon: Icons.UsersSolid,
    roles: ["admin"],
  },
  {
    name: "Book Management",
    href: "/book-management",
    icon: Icons.InventoryOutline,
    roles: ["admin"],
  },
  {
    name: "Settings",
    href: "/dashboard/admin/settings",
    icon: Icons.SettingsOutline,
    activeIcon: Icons.SettingsSolid,
    roles: ["admin"],
  },
];

// Helper function to get nav items based on role
export const getNavItemsByRole = (
  role: "user" | "admin" | undefined,
): NavItem[] => {
  if (!role) return COMMON_NAV_ITEMS;

  const roleSpecificItems = {
    user: USER_NAV_ITEMS,
    admin: ADMIN_NAV_ITEMS,
  };

  return [...COMMON_NAV_ITEMS, ...(roleSpecificItems[role] || [])].filter(
    (item) => item.roles.includes(role),
  );
};
