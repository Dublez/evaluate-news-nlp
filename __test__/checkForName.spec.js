import { checkForName} from '../src/client/js/nameChecker';
import 'regenerator-runtime/runtime';

describe("Testing the submit functionality", () => {
    test("Testing the checkForName() function", () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        checkForName("Picard");
        expect(window.alert).toHaveBeenCalled();
    })
});