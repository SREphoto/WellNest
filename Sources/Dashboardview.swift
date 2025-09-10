import SwiftUI

struct DashboardView: View {
    @StateObject private var circleManager = CircleManager.shared
    
    var body: some View {
        NavigationView {
            List {
                ForEach(circleManager.users) { user in
                    HStack(spacing: 15) {
                        Image(systemName: user.moodIcon)
                            .resizable()
                            .scaledToFit()
                            .frame(width: 40, height: 40)
                            .foregroundColor(user.score > 50 ? .accentColor : .red)

                        VStack(alignment: .leading) {
                            Text(user.name)
                                .font(.headline)
                            if let status = user.status {
                                Text(status)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                        }

                        Spacer()

                        Button(action: {
                            if let url = URL(string: "sms:123-456-7890&body=Thinking of you!") {
                                UIApplication.shared.open(url)
                            }
                        }) {
                            Image(systemName: "message.fill")
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.accentColor)
                    }
                    .padding()
                    .background(user.score < 20 || user.status == "Help" ? Color.red.opacity(0.1) : Color(UIColor.systemBackground))
                    .cornerRadius(10)
                    .shadow(radius: 2)
                }
                .onDelete(perform: { indexSet in
                    // Placeholder for deleting users
                    print("Deleting users at \(indexSet)")
                })
            }
            .listStyle(.insetGrouped)
            .navigationTitle("My Circle")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        // Placeholder for adding a new user
                        print("Add new user")
                    }) {
                        Image(systemName: "plus")
                    }
                }
            }
        }
    }
}

// Preview provider (for when you get to Xcode)
struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView()
    }
}
