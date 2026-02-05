// Roles
export const ROLES = ["ADMIN", "USER"];

// level 1
// export const BASIC_PERMISSION = Object.freeze({
//   ADMIN: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   USER: ["GET", "POST"],
// });

export const PERMISSION = Object.freeze({
  ADMIN: [
    "read:admin",
    "create:admin",
    "update:admin",
    "delete:admin",
    "patch:admin",
  ],
  USER: ["read:user", "create:user"],
});
