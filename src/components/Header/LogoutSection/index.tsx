import React from "react";
import { LogoutSectionProps } from "./types";

const LogoutSection: React.FC<LogoutSectionProps> = ({
    isOpenModal,
    handleLogout,
    closeModal,
}) => {
    return (
        <>
            {isOpenModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <dialog
                        className="modal modal-bottom sm:modal-middle"
                        open={isOpenModal}
                        onClose={closeModal}
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-2xl">
                                Sure you wanna log out?
                            </h3>
                            <p className="py-4">
                                Just a heads-up: if you do, you’ll have to repeat the login
                                process from the start.
                            </p>
                            <div className="modal-action">
                                <div>
                                    <button
                                        className="btn btn-primary btn-block normal-case text-lg"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </div>
                                {/* No, Stay button will close the modal */}
                                <button className="btn normal-case text-lg" onClick={closeModal}>
                                    No
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </>
    );
};

export default LogoutSection;
