import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="notfound">
      <div>
        <div className="big-stat outline-text">404</div>
        <p className="lead" style={{ margin: "24px auto 32px" }}>
          This shipment seems to have gone off route.
        </p>
        <Button href="/">Back home</Button>
      </div>
    </div>
  );
}
