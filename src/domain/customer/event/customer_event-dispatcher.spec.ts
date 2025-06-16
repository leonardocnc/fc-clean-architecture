import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressUpdatedEvent from "./address-updated.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendLogOneHandler from "./handler/send-log-one.handler";
import SendLogTwoHandler from "./handler/send-log-two.handler";
import SendLogHandler from "./handler/send-log.handler";

describe("Customer events tests", () => {
  it("should notify CustomerCreatedEvent handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const sendLogOneHandler = new SendLogOneHandler();
    const sendLogTwoHandler = new SendLogTwoHandler();

    const spySendLogOneHandler = jest.spyOn(sendLogOneHandler, "handle");
    const spySendLogTwoHandler = jest.spyOn(sendLogTwoHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", sendLogOneHandler);
    eventDispatcher.register("CustomerCreatedEvent", sendLogTwoHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(sendLogOneHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(sendLogTwoHandler);

    const productCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "John Doe",
      street: "Street",
      number: 123,
      zipcode: "zip",
      city: "City",
      active: true,
      rewardPoints: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(sendLogOneHandler.handle).toHaveBeenCalledWith(productCreatedEvent);
    expect(sendLogTwoHandler.handle).toHaveBeenCalledWith(productCreatedEvent);
    expect(spySendLogOneHandler).toHaveBeenCalled();
    expect(spySendLogTwoHandler).toHaveBeenCalled();
  });

  it("should notify AddressUpdatedEvent handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const sendLogHandler = new SendLogHandler();

    const spySendLogHandler = jest.spyOn(sendLogHandler, "handle");
    eventDispatcher.register("AddressUpdatedEvent", sendLogHandler);

    expect(eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]).toMatchObject(sendLogHandler);

    const addressUpdatedEvent = new AddressUpdatedEvent({
      id: "1",
      name: "John Doe",
      address: "Street, 321, Zip, City",
    });

    eventDispatcher.notify(addressUpdatedEvent);
    expect(sendLogHandler.handle).toHaveBeenCalledWith(addressUpdatedEvent);
    expect(spySendLogHandler).toHaveBeenCalled();
  });
});
