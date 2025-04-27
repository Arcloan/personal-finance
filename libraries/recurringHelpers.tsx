interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar?: string;
  recurring: boolean;
}

export function checkIfInside(recurringTransaction: Transaction[], transaction: Transaction) {
  for (const recurTransaction of recurringTransaction) {
    if (recurTransaction.name == transaction.name) {
      return true;
    }
  }
  return false;
}

export function calculatePaid(acc: number, t: Transaction) {
   if (! t.recurring) {
      return acc;
    }
    if (new Date().getDate() - new Date(t.date).getDate() >= 0) {
      return Number((acc + Number(Math.abs(t.amount))).toFixed(2));
    }
    return acc;
}

export function calculateTotalUpcoming(acc: number, t: Transaction) {
  if (! t.recurring) {
    return acc;
  }
  if (new Date().getDate() - new Date(t.date).getDate() < 0) {
    return Number((acc + Math.abs(t.amount)).toFixed(2));
  }
  return acc;
}

export function calculateDueSoon(acc: number, t: Transaction) {
  if (! t.recurring) {
    return acc;
  }
  if (new Date().getDate() - new Date(t.date).getDate() < 0 && new Date().getDate() - new Date(t.date).getDate() > -10) {
    return Number((acc + Math.abs(t.amount)).toFixed(2));
  }
  return acc;
}

export function isPaid(t: Transaction) {
  return new Date().getDate() - new Date(t.date).getDate() >= 0;
}

export function isDueSoon(t: Transaction) {
  return new Date().getDate() - new Date(t.date).getDate() < 0 && new Date().getDate() - new Date(t.date).getDate() > -10;
}