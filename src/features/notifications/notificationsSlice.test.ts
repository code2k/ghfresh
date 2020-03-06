import reducer, {
  addNotification,
  nextNotification,
  NotificationsState
} from "./notificationsSlice";

describe("notificationsSlice", () => {
  it("should set one notification as current", () => {
    let state: NotificationsState = { queue: [] };
    state = reducer(state, addNotification({ message: "noti" }));
    expect(state.current).not.toBeUndefined();
    expect(state.current?.message).toEqual("noti");
    expect(state.queue).toHaveLength(0);
  });

  it("should queue second notification", () => {
    let state: NotificationsState = { queue: [] };
    state = reducer(state, addNotification({ message: "noti" }));
    state = reducer(state, addNotification({ message: "noti2" }));
    expect(state.queue).toHaveLength(1);
  });

  it("should correctly handle nextNotification", () => {
    let state: NotificationsState = { queue: [] };
    state = reducer(state, addNotification({ message: "noti" }));
    state = reducer(state, addNotification({ message: "noti2" }));
    expect(state.current).not.toBeUndefined();
    expect(state.queue).toHaveLength(1);

    state = reducer(state, nextNotification());
    expect(state.current).not.toBeUndefined();
    expect(state.queue).toHaveLength(0);

    state = reducer(state, nextNotification());
    expect(state.current).toBeUndefined();
    expect(state.queue).toHaveLength(0);
  });
});
