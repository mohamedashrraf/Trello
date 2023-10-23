"use client";

import React from "react";
import style from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={style.body}>
      <footer className={style.footer}>
        <div className={style.container}>
          <div className={style.row}>
            <div className={style.footerCcol}>
              <h4>company</h4>
              <ul>
                <li>
                  <Link href="#">about us</Link>
                </li>
                <li>
                  <Link href="#">our services</Link>
                </li>
                <li>
                  <Link href="#">privacy policy</Link>
                </li>
                <li>
                  <Link href="#">affiliate program</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerCcol}>
              <h4>get help</h4>
              <ul>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">Plans</Link>
                </li>
                <li>
                  <Link href="#">returns</Link>
                </li>
                <li>
                  <Link href="#">payment options</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerCcol}>
              <h4>Online Taskes</h4>
              <ul>
                <li>
                  <Link href="#">Teaching</Link>
                </li>
                <li>
                  <Link href="#">Studing</Link>
                </li>
                <li>
                  <Link href="#">Tests</Link>
                </li>
                <li>
                  <Link href="#">Projects</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerCcol}>
              <h4>follow us</h4>
              <div className={style.socialLinks}>
                <Link href="#">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link href="#">
                  <i className="fab fa-twitter" />
                </Link>
                <Link href="#">
                  <i className="fab fa-instagram" />
                </Link>
                <Link href="#">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
            </div>
          </div>
        </div>
          <div className={style.copyright}>
          <h5 className="text-white text-center mt-5">By <i className="fa-solid fa-heart ms-1 me-1"></i> From Team React </h5>
          </div>
      </footer>
    </div>
  );
}
