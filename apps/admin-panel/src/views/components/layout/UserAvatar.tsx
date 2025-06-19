import { createSignal, onCleanup } from "solid-js";
import { useMutation } from "@tanstack/solid-query";
import { A, useNavigate } from "@solidjs/router";
import UserCircleIcon from "@icons/UserCricle";
import UserRoundedFillIcon from "@icons/UserRoundedFill";
import LogoutIcon from "@icons/Logout";
import BackArrow from "@icons/BackArrow";
import { adminUsersApis } from "@apis/admin_users";

import Avatar from "@assets/Avatar.png";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal<boolean>(false);

  const modalContext = useModal();

  const toggleDropdown = () => setOpen((prev) => !prev);

  let dropdownRef: HTMLDivElement | undefined;
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalContext.isOpen &&
      typeof modalContext.isOpen === "function" &&
      modalContext.isOpen()
    ) {
      return;
    }
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => {
      window.removeEventListener("mousedown", handleClickOutside);
    });
  }

  const mutation = useMutation<void, unknown, void>(() => ({
    mutationFn: () => adminUsersApis.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH.CHECK_AUTH] });
      navigate("/login", { replace: true });
    },
    onError: (error: unknown) => {
      console.error("Logout error =", error);
    },
  }));

  const [showLogoutModal, setShowLogoutModal] = createSignal(false);

  return (
    <>
      <Modal.Info
        open={showLogoutModal()}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={async () => {
          await mutation.mutateAsync();
          setShowLogoutModal(false);
        }}
      />
      <div
        class="avatar"
        ref={dropdownRef as unknown as (el: HTMLDivElement) => void}
      >
        <button onClick={toggleDropdown} class="profile-img">
          <img src={Avatar} alt="User Avatar" />
          <span class="icon">
            <BackArrow />
          </span>
        </button>

        {open() && (
          <div class="dropdown-menu ">
            <ul>
              <li>
                <A href="#" class="username">
                  <span>
                    <UserCircleIcon />
                  </span>
                  <div>
                    <h4>{"Dinesh Kumar"}</h4>
                    <small>Admin</small>
                  </div>
                </A>
              </li>
              <li>
                <A href="/profile" onClick={() => setOpen(false)}>
                  <span>
                    <UserRoundedFillIcon />
                  </span>
                  Profile
                </A>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutModal(true);
                  }}
                >
                  <span>
                    <LogoutIcon />
                  </span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AvatarDropdown;
