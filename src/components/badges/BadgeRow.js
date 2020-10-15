import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCounter, useEffectOnce } from "react-use";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import classnames from "classnames";

import BadgeCard from "./BadgeCard";

// cards are actually 180px wide, but want to add some extra padding
const CARD_OFFSET = 3;
const CARD_SIZE = 180 + CARD_OFFSET * 2;

// gets page size as width of badges page minus padding
const getContainerSize = () => {
  const container =
    document.getElementById("badges") || document.querySelector("body");
  const containerStyle = getComputedStyle(container);
  return (
    container.clientWidth -
    Number.parseFloat(containerStyle.paddingLeft.replace("px", "")) -
    Number.parseFloat(containerStyle.paddingRight.replace("px", ""))
  );
};

const BadgeRow = ({ badges, title }) => {
  const [containerSize, setContainerSize] = useState(getContainerSize());

  // will also re-run this because sometimes the BadgeRow will start rendering
  // before the badges page is rendered
  useEffectOnce(() => setContainerSize(getContainerSize()));

  const pageSize = Math.floor(containerSize / CARD_SIZE);
  console.log("pageSize:", pageSize);

  const slides = badges.map(({ entityId }) => {
    const key = title + "-" + entityId;
    return <BadgeCard entityId={entityId} key={key} />;
  });

  const [page, { inc: nextPage, dec: prevPage, set: setPage }] = useCounter(0);

  const count = badges.length;

  const onResize = () => {
    // setting the container size triggers a refresh
    setContainerSize(getContainerSize());
  }

  window.addEventListener("resize", onResize);

  const numberOfDots = Math.ceil(count / pageSize);

  return (
    <div className="badge-row">
      <div className="badge-row-title">{title}</div>
      <div
        className={classnames("badge-row-carousel", {
          "hide-dots": count <= pageSize,
        })}
      >
        <Carousel
          className="badge-carousel"
          onChange={setPage}
          value={page * pageSize}
          slidesPerPage={pageSize}
          slides={slides}
          offset={CARD_OFFSET}
        />
        <Dots
          number={numberOfDots}
          onChange={setPage}
          value={page}
        />
      </div>
    </div>
  );
};
BadgeRow.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default BadgeRow;
