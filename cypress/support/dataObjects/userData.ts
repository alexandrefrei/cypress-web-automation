import { DB } from '../utils/db';

class UserData {
  verifyUserData(): void {
    DB.getUser().then((result) => {
      expect(result.rows[0].id).to.equal('30_qa_company');
    });
  }
}

export const userData = new UserData();
