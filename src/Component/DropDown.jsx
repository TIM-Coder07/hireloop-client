import {
  ArrowRightFromSquare,
  Gear,
  Person,
} from "@gravity-ui/icons";

import { Avatar, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export function DropDown({ user }) {
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/logIn";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dropdown>
      
      <Dropdown.Trigger className="rounded-full cursor-pointer">
        <Avatar>
          <Avatar.Image
            alt="User"
            src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg` || user?.image}
          />
          <Avatar.Fallback>
            {user?.name?.charAt(0) || "U"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu>

          <Dropdown.Item id="dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>

          <Dropdown.Item id="profile">
            <Label>Profile</Label>
          </Dropdown.Item>

          <Dropdown.Item id="settings">
            <Label>Settings</Label>
            <Gear className="size-3.5 text-gray-500" />
          </Dropdown.Item>

          <Dropdown.Item id="team">
            <Label>Create Team</Label>
            <Person className="size-3.5 text-gray-500" />
          </Dropdown.Item>

          {/* 🔥 LOGOUT */}
          <Dropdown.Item
            id="logout"
            variant="danger"
            onClick={handleSignOut}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-red-500" />
            </div>
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}